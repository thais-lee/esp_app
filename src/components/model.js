import React, {useState} from 'react';

import {Portal, Modal, TextInput, List} from 'react-native-paper';
import SwitchControl from '@src/components/switch';

const ModalSetting = ({visible, onDismiss, mqtt}) => {
  const [led, setLed] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [time, setTime] = useState(20000);
  const toggleLed = () => {
    setLed(!led);
    if (!led) {
      mqtt.publish('thaile/esp/led', 'on');
      console.log('on');
    } else {
      mqtt.publish('thaile/esp/led', 'off');
      console.log('off');
    }
  };

  const toggleSaveData = () => {
    setSaveData(!saveData);
    if (!saveData) {
      mqtt.publish('thaile/esp/sendData', 'on');
      console.log('on');
    } else {
      mqtt.publish('thaile/esp/sendData', 'off');
      console.log('off');
    }
  };

  const containerStyle = {backgroundColor: 'white', padding: 20};
  return (
    <Portal>
      <Modal
        visible={visible}
        contentContainerStyle={containerStyle}
        onDismiss={onDismiss}>
        <SwitchControl data={led} setData={toggleLed} name="led" />
        <SwitchControl
          data={saveData}
          setData={toggleSaveData}
          name="saveData"
        />
        <List.Item
          title="Read delay Time(s)"
          description="Time delay per update"
          right={() => (
            <TextInput
              onChangeText={text => setTime(parseInt(text))}
              value={time.toString()}
              keyboardType="numeric"
              maxLength={15}
              onSubmitEditing={() => {
                mqtt.publish('thaile/esp/readDelay', time.toString());

                console.log('pressout', time.toString());
              }}
            />
          )}
        />
      </Modal>
    </Portal>
  );
};

export default ModalSetting;
