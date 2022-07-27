import * as React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Surface, Text, Button} from 'react-native-paper';
import TopBar from '@src/components/appbar';
import SettingModal from '@src/components/settingModal';

const DEFAULT_URI = 'ws://192.168.1.22:8000';
// let ws = new WebSocket(DEFAULT_URI);
let ws;

const ServerScreen = () => {
  //websocket
  const serverMessagesList = [];

  const [visible, setVisible] = React.useState(false);
  const [ip, setIp] = React.useState('192.168.1.22');
  const [port, setPort] = React.useState('8000');
  const [serverState, setServerState] = React.useState('Loading...');
  const [disableButton, setDisableButton] = React.useState(false);
  const [serverMessages, setServerMessages] = React.useState([]);
  const [isTrained, setIsTrained] = React.useState(false);

  const handleSaveSettings = (serverIp, serverPort) => {
    setIp(serverIp);
    setPort(serverPort);
    initialSocketConnection(ip, port);
  };

  const hideModel = () => {
    setVisible(false);
  };

  const initialSocketConnection = (ip, port) => {
    const uri = 'ws://' + ip + ':' + port;
    ws = new WebSocket(uri);

    ws.onopen = () => {
      setServerState('Connected to the server');
      setDisableButton(false);
    };

    ws.onmessage = e => {
      const recvMsg = JSON.parse(e.data);

      if(recvMsg.type === 'msg'){
        setIsTrained(recvMsg.status);
      }

      serverMessagesList.push('Server: ' + recvMsg.msg);
      setServerMessages([...serverMessagesList]);
    };

    ws.onclose = e => {
      setServerState('Disconnected. Check internet or server.');
      setDisableButton(true);
      setTimeout(() => {
        setServerState('Reconnecting...');
        initialSocketConnection(ip, port);
      }, 2000);
      setServerState('Disconnected. Check internet or server.');
    };
  };

  const predict = () => {
    const data = {
      type: 'predict',
    };

    serverMessagesList.push('Send: Predict');
    ws.send(JSON.stringify(data));
  };

  const predictTest = () => {
    const data = {
      type: 'predictTest',
    };

    serverMessagesList.push('Send: Predict Test');
    ws.send(JSON.stringify(data));
  };

  const train = () => {
    const data = {
      type: 'train',
    };

    serverMessagesList.push('Send: Train');
    ws.send(JSON.stringify(data));
  };
  React.useEffect(() => {
    initialSocketConnection(ip, port);
  }, []);

  return (
    <View style={styles.container}>
      <Surface>
        <TopBar onPress={() => setVisible(true)} />
      </Surface>
      <View style={styles.status}>
        <Text>{serverState}</Text>
      </View>
      <View style={styles.serverResponse}>
        <ScrollView>
          {serverMessages.map((item, ind) => {
            return <Text key={ind}>{item}</Text>;
          })}
        </ScrollView>
      </View>

      <View style={styles.buttons}>
        <Button disabled={disableButton} onPress={train}>
          <Text>Train</Text>
        </Button>
        <Button disabled={!(isTrained)} onPress={predictTest}>
          <Text>PredictTest</Text>
        </Button>
        <Button disabled={!(isTrained)} onPress={predict}>
          <Text>Predict</Text>
        </Button>
      </View>
      <SettingModal
        visible={visible}
        setVisible={hideModel}
        handleSave={handleSaveSettings}
        portAdd={port}
        ipAdd={ip}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  status: {
    height: 30,
    backgroundColor: '#eeceff',
    padding: 5,
  },
  serverResponse: {
    backgroundColor: '#ffeece',
    padding: 5,
    flexGrow: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default ServerScreen;
