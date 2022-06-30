import React from 'react';

import {Switch, List, Menu} from 'react-native-paper';
let nameSwitch = 'none';
let des = '';

const SwitchControl = ({data, setData, name}) => {
  if (name === 'led') {
    nameSwitch = 'Led';
    des = 'Turn on/off led onBoard'
  }
  if (name === 'saveData') {
    nameSwitch = 'Save Data';
    des = 'By turn on this, app will send the data to server';
  }
  return (
    <List.Section>
      <List.Item
        title={nameSwitch}
        description={des}
        right={() => <Switch value={data} onValueChange={setData} />}
      />
    </List.Section>
  );
};

export default SwitchControl;
