import { Group, Panel, PanelHeader, Title } from "@vkontakte/vkui";
import FactCats from "./components/FactCats/FactCats";
import AgeOfName from "./components/AgeOfPerson/AgeOfPerson";
import styles from "./App.module.css";

const App: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Panel>
        <PanelHeader>
          <Title level="2">Узнай факты о милых котиках :)</Title>
        </PanelHeader>
        <Group>
          <FactCats />
        </Group>
      </Panel>
      <Panel>
        <PanelHeader>
          <Title level="2">
            Узнай сколько в среднем лет людям с твоим именем :)
          </Title>
        </PanelHeader>
        <Group>
          <AgeOfName />
        </Group>
      </Panel>
    </div>
  );
};

export default App;
