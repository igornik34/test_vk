import { useRef, useState } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { Button, FormItem, FormLayoutGroup } from "@vkontakte/vkui";
import { useGetPersonByNameQuery } from "../../app/services/persons";
import cn from "classnames";
import styles from "./AgeOfPerson.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

function AgeOfPerson() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [skip, setSkip] = useState<boolean>(true);
  const { data, isLoading, refetch } = useGetPersonByNameQuery(
    inputRef.current?.value || "",
    { skip }
  );
  const { errorDuplicateNames, errorResponse } = useSelector(
    (s: RootState) => s.persons
  );

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-ZА-Я]+$/i, "Поле должно содержать только буквы")
      .required("Имя обязательно"),
  });
  return (
    <>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(_, { setSubmitting }) => {
          setSkip(false);
          refetch();
          setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <FormLayoutGroup mode="horizontal" className={styles.form}>
              <FormItem status={(isSubmitting && "valid") || undefined}>
                <Field name="name">
                  {({ field }: FieldProps) => (
                    <input
                      className={cn(styles.input, {
                        [styles.noValid]: !isValid,
                      })}
                      type="text"
                      {...field}
                      ref={inputRef}
                      placeholder="Введите имя"
                    />
                  )}
                </Field>
              </FormItem>
              <Button size="l" type="submit" disabled={isLoading}>
                {isLoading ? "Загрузка..." : "Узнать возраст"}
              </Button>
            </FormLayoutGroup>
            <ErrorMessage name="name" />
            {data && <p>Возраст: {data.age}</p>}
            {errorDuplicateNames && (
              <p className={styles.error}>{errorDuplicateNames}</p>
            )}
            {errorResponse && <p className={styles.error}>{errorResponse}</p>}
          </Form>
        )}
      </Formik>

      <p>{data?.age}</p>
    </>
  );
}

export default AgeOfPerson;
