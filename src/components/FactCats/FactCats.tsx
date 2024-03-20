import { Button, Div, Textarea } from "@vkontakte/vkui";
import { useEffect, useRef, useState } from "react";
import { setCursorPosition } from "../../utils/setCursorPosition";
import { useGetFactQuery } from "../../app/services/factCats";
import styles from "./FactCats.module.css"

function FactCats() {
  const factInputRef = useRef<HTMLTextAreaElement>(null);
  const [skip, setSkip] = useState(true);
  const { data, isLoading, refetch } = useGetFactQuery(undefined, {
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
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSkip(false);
          refetch();
        }}
        className={styles.form}
      >
        <Textarea
          getRef={factInputRef}
          placeholder="Узнай факты о котиках..."
        />
        <Button size="l" type="submit" disabled={isLoading}>
          {isLoading ? "Загрузка..." : "Узнать факт"}
        </Button>
      </form>
    </Div>
  );
}

export default FactCats;
