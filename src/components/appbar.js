import React from 'react';
import {Appbar, Provider} from 'react-native-paper';

const TopBar = ({onPress}) => {
  return (
    <Appbar.Header>
      <Appbar.Action icon="tools" onPress={onPress} />
    </Appbar.Header>
  );
};

export default TopBar;
