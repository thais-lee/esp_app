import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import MQTT from 'sp-react-native-mqtt';

const initConnection = createAsyncThunk(
  'mqtt/initConnectionStatus',
  async () => {
    const response = await MQTT.createClient({
      uri: 'mqtt://broker.hivemq.com:1883',
      clientId: 'thaile',
    });

    return response;
  },
);

const initialState = {
  mqttClient: 0,
};

export const mqttSlice = createSlice({
  name: 'mqtt',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initConnection.fulfiled, (state, action) => {
      state.mqttClient = action.payload;
    });
  },
});
