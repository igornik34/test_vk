import { Button, Div, Textarea } from "@vkontakte/vkui";
import { Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { setCursorPosition } from "../../utils/setCursorPosition";
import styles from "./FactCats.module.css";
import { useGetFactQuery } from "../../app/services/factCats";

function FactCats() {
  const factInputRef = useRef<HTMLTextAreaElement>(null);
  const [skip, setSkip] = useState(true);
  const { data, isLoading, error, refetch } = useGetFactQuery(undefined, {
    skip: skip,
  });

  useEffect(() => {
    if (data && factInputRef.current) {
      factInputRef.current.value = data.fact;
      setCursorPosition(data.fact, factInputRef);
    }
  }, [data, factInputRef]);

  return (
    <Div>
      <Formik
        initialValues={{}}
        onSubmit={() => {
          setSkip(false); // После отправки формы изменяем skip на false
          refetch(); // Выполняем запрос
        }}
      >
        <Form className={styles.form}>
          <Textarea
            getRef={factInputRef}
            placeholder="Узнай факты о котиках..."
          />
          <Button
            size="l"
            type="submit"
            disabled={isLoading}
            loading={isLoading}
          >
            {!isLoading ? "Узнать факт" : ""}
          </Button>
        </Form>
      </Formik>
    </Div>
  );
}

export default FactCats;
