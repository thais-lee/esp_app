import MQTT from 'sp-react-native-mqtt';

export default class Mqtt {
  constructor({uri, clientId, onClose, onError, onConnect}) {
    this.client = null;
    MQTT.createClient({
      uri: uri || 'mqtt://broker.emqx.io:1883',
      clientId: clientId || '1q2w3e',
    })
      .then(client => {
        this.client = client;
        this.client.connect();

        client.on('close', onClose);
        client.on('error', onError);
        client.on('connect', onConnect);
      })
      .catch(err => {
        console.log(err);
      });
  }
  on(event, callback){
    this.client.on(event, callback);
  }

  subscribe(topic, qos = 0) {
    this.client.subscribe(topic, qos);
  }

  publish(topic, message, qos = 0, retain = false) {
    this.client.publish(topic, message, qos, retain);
  }

  disconnect() {
    this.client.disconnect();
  }

  isConnected() {
    return this.client.isConnected();
  }
}