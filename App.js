import React, {useEffect, useState} from 'react';
import {Text, Provider, List, Surface} from 'react-native-paper';
import {currentTime} from '@src/utils/curTime';
import Chart from '@src/components/chart';
import Mqtt from '@src/features/mqtt/MQTTConnection';
import TopBar from '@src/components/appbar';
import ModalSetting from '@src/components/model';
import {ScrollView} from 'react-native';

const mqtt = new Mqtt({
  uri: 'mqtt://broker.hivemq.com:1883',
  clientId: 'iwbnibw',
  subTopic: 'thaibachkhoa',

  onConnect: () => {
    console.log('connected');
  },
});

const HumiCompo = ({humidity}) => {
  return (
    <List.Section>
      <List.Item
        style={{alignItems: 'center', alignContent: 'center'}}
        left={props => <List.Icon {...props} icon="water" />}
        title="Humidity"
        right={props => (
          <Text {...props} style={{alignSelf: 'center', fontSize: 28}}>
            {humidity.toString()}
          </Text>
        )}
      />
    </List.Section>
  );
};

const TempCompo = ({temperature}) => {
  return (
    <List.Section>
      <List.Item
        style={{alignItems: 'center', alignContent: 'center'}}
        left={props => <List.Icon {...props} icon="temperature-celsius" />}
        title="Temperature"
        right={props => (
          <Text {...props} style={{alignSelf: 'center', fontSize: 28}}>
            {temperature.toString()}
          </Text>
        )}
      />
    </List.Section>
  );
};

const App = () => {
  const [humidity, setHumidity] = useState([0]);
  const [temperature, setTemperature] = useState([0]);
  const [listDateTemp, setListDateTemp] = useState([0]);
  const [listDateHumi, setListDateHumi] = useState([0]);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (await mqtt.isConnected()) {
        mqtt.subscribe('thaibachkhoa');
        mqtt.subscribe('thaile/sensor/temperature_celsius');
        mqtt.subscribe('thaile/sensor/humidity');
        console.log('subscribed');
        clearInterval(interval);
      }
    }, 1000);
  }, []);

  setTimeout(() => {
    mqtt.on('message', message => {
      if (message.topic === 'thaile/sensor/humidity') {
        setHumidity(humidity.concat(parseFloat(message.data)));
        setListDateHumi([...listDateHumi, currentTime()]);
      }

      if (message.topic === 'thaile/sensor/temperature_celsius') {
        setTemperature([...temperature, parseFloat(message.data)]);
        setListDateTemp([...listDateTemp, currentTime()]);
      }
    });
  }, 2000);

  return (
    <Provider>
      <ScrollView>
        <Surface>
          <TopBar onPress={() => setShowModal(true)} />
        </Surface>
        <Surface>
          <Surface>
            <HumiCompo humidity={humidity[humidity.length - 1]} />
            <TempCompo temperature={temperature[temperature.length - 1]} />
          </Surface>
          <Surface>
            <Surface>
              <Chart
                content={temperature}
                name={'temperature'}
                date={listDateTemp}
              />
              <Chart content={humidity} name={'humidity'} date={listDateHumi} />
            </Surface>
          </Surface>

          <ModalSetting
            visible={showModal}
            onDismiss={() => setShowModal(false)}
            mqtt={mqtt}
          />
        </Surface>
      </ScrollView>
    </Provider>
  );
};

export default App;
