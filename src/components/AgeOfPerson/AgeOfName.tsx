import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Button, FormItem, FormLayoutGroup } from "@vkontakte/vkui";
import { useGetPersonByNameQuery } from "../../app/services/persons";
import cn from "classnames";
import styles from "./AgeOfPerson.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-ZА-Я]+$/i, "Поле должно содержать только буквы")
    .required("Имя обязательно"),
});

interface IFormState {
  name: string;
}

function AgeOfPerson() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    getValues,
  } = useForm<IFormState>({
    resolver: yupResolver(validationSchema),
  });
  const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);
  const { persons, errorResponse } = useSelector((s: RootState) => s.persons);
  const [errorDuplicateNames, setErrorDuplicateNames] = useState("");
  const [skip, setSkip] = useState<boolean>(true);
  const { data, isLoading, refetch } = useGetPersonByNameQuery(
    getValues().name,
    {
      skip,
    }
  );

  const onSubmit = async (formData: IFormState) => {
    clearTimeout(timeoutId);
    const existingPerson = persons.find((p) => p.name === formData.name);
    if (existingPerson) {
      setSkip(true);
      setErrorDuplicateNames(
        `Человек с именем ${existingPerson.name} уже запрашивался. Вот его возраст: ${existingPerson.age}`
      );
      return;
    }
    if (isValid) {
      errorDuplicateNames && setErrorDuplicateNames("");
      setSkip(false);
      await refetch();
    }
  };

  const handleInputChange = (formData: IFormState) => {
    setSkip(true);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (isValid) {
      const newTimeoutId = setTimeout(async () => {
        onSubmit(formData);
      }, 3000);
      setTimeoutId(newTimeoutId);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLayoutGroup mode="horizontal" className={styles.form}>
        <FormItem>
          <input
            className={cn(styles.input, {
              [styles.noValid]: !isValid,
            })}
            type="text"
            {...register("name")}
            onChange={handleSubmit(handleInputChange)}
            placeholder="Введите имя"
          />
        </FormItem>
        <Button size="l" type="submit" disabled={isLoading}>
          {isLoading ? "Загрузка..." : "Узнать возраст"}
        </Button>
      </FormLayoutGroup>
      {data && <p>Возраст: {data.age}</p>}
      {data?.count === null && (
        <p className={styles.error}>Такого имени не найдено!</p>
      )}
      {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      {errorDuplicateNames && (
        <p className={styles.error}>{errorDuplicateNames}</p>
      )}
      {errorResponse && <p className={styles.error}>{errorResponse}</p>}
    </form>
  );
}

export default AgeOfPerson;
