import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SensorScreen from '@src/Screens/sensorScreen';
import ServerScreen from '@src/Screens/serverScreen';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Sensor') {
            iconName = focused
              ? 'md-hardware-chip-sharp'
              : 'md-hardware-chip-outline';
          } else if (route.name === 'Server') {
            iconName = focused ? 'server' : 'server-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Sensor"
        component={SensorScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Server"
        component={ServerScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
