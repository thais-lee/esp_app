import React from 'react';
import {Appbar, Provider} from 'react-native-paper';
import ModalSetting from './model';

const TopBar = ({onPress}) => {
  return (
    <Provider>
      <Appbar.Header>
        <Appbar.Action icon="tools" onPress={onPress} />
      </Appbar.Header>
    </Provider>
  );
};

export default TopBar;
