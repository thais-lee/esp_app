import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from '@src/navigation/bottomTab';

const App = () => {
  return (
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
  );
};

export default App;
