import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from '@src/navigation/bottomTab';
import {Provider} from 'react-native-paper';

const App = () => {
  return (
    <NavigationContainer>
      <Provider>
        <BottomTab />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
