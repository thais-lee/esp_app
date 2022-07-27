import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  TextInput,
  Modal,
  Portal,
  Surface,
  Text,
  Button,
} from 'react-native-paper';

const SettingModal = ({visible, setVisible, handleSave, portAdd, ipAdd}) => {
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const [ipAddr, setIpAddr] = React.useState(ipAdd);
  const [port, setPort] = React.useState(portAdd);

  return (
    <Portal>
      <Modal
        containerStyle={containerStyle}
        visible={visible}
        onDismiss={() => setVisible(false)}>
        <Surface style={{alignItems: 'center'}}>
          <Text style={{fontSize: 30}}>Server Settings</Text>
        </Surface>
        <Surface
          style={{flexDirection: 'row', padding: 20, alignItems: 'center'}}>
          <Text>IP Address: </Text>
          <TextInput
            mode="flat"
            keyboardType="numeric"
            onChangeText={text => setIpAddr(text)}
            value={ipAddr}
          />
        </Surface>
        <Surface
          style={{flexDirection: 'row', padding: 20, alignItems: 'center'}}>
          <Text>Port: </Text>
          <TextInput
            keyboardType="numeric"
            mode="flat"
            onChangeText={text => setPort(text)}
            value={port}
          />
        </Surface>
        <Surface
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingTop: 25,
            paddingBottom: 20,
          }}>
          <Button
            mode="contained"
            onPress={() => {
              handleSave(ipAddr, port);
              setVisible();
            }}>
            <Text>Save</Text>
          </Button>
          <Button mode="outlined" onPress={setVisible}>
            <Text>Cancel</Text>
          </Button>
        </Surface>
      </Modal>
    </Portal>
  );
};

export default SettingModal;
