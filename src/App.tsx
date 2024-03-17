import {
  AdaptivityProvider,
  Button,
  ConfigProvider,
  Group,
  IconButton,
  Panel,
  PanelHeader,
  Root,
  Title,
  View,
} from "@vkontakte/vkui";
import FactCats from "./components/FactCats/FactCats";
import AgeOfName from "./components/AgeOfPerson/AgeOfName";
import { useState } from "react";

const App: React.FC = () => {
  const [activePanel, setActivePanel] = useState<string>("factCats");
  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <Root activeView="view">
          <View activePanel={activePanel} id="view">
            <Panel id="factCats">
              <PanelHeader>
                <Title level="2">Узнай факты о милых котиках :)</Title>
              </PanelHeader>
              <Group>
                <FactCats />
                <Button onClick={() => setActivePanel("ageOfName")}>
                  К годам
                </Button>
              </Group>
            </Panel>
            <Panel id="ageOfName">
              <PanelHeader>
                <Title level="2">
                  Узнай сколько в среднем лет людям с твоим именем :)
                </Title>
              </PanelHeader>
              <Group>
                <AgeOfName />
                <Button onClick={() => setActivePanel("factCats")}>
                  К кошкам
                </Button>
              </Group>
            </Panel>
          </View>
        </Root>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
