import { useRef, useState } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { Button, FormItem, FormLayoutGroup } from "@vkontakte/vkui";
import { useGetPersonByNameQuery } from "../../app/services/persons";

function AgeOfPerson() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [skip, setSkip] = useState<boolean>(true);
  const { data, isLoading, refetch } = useGetPersonByNameQuery(
    inputRef.current?.value || "",
    { skip }
  );

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-ZА-Я]+$/i, "Поле должно содержать только буквы!")
      .required("Имя обязательно"),
  });
  return (
    <>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setSkip(false);
          refetch();
          setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormLayoutGroup>
              <FormItem
                top="Введите имя"
                status={(isSubmitting && "valid") || undefined}
              >
                <Field name="name">
                  {({ field }: FieldProps) => (
                    <div>
                      <input type="text" {...field} ref={inputRef} />
                      <ErrorMessage name="name" component="div" />
                    </div>
                  )}
                </Field>
              </FormItem>
              <Button size="l" type="submit" disabled={isLoading}>
                Отправить
              </Button>
            </FormLayoutGroup>
          </Form>
        )}
      </Formik>

      <p>{data?.age}</p>
    </>
  );
}

export default AgeOfPerson;
