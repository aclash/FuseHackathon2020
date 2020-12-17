import React, {createContext, useEffect, useState } from 'react';
import Connection from './Connection';
import Publisher from './Publisher';
import Receiver from './Receiver';
import mqtt from 'mqtt';

export const PatTypeOption = createContext([])
const patTypeOption = [
  {
    label: 'back',
    value: 'back',
  }, {
    label: 'shoulder',
    value: 'shoulder',
  }
];

const HookMqtt = () => {
  const [client, setClient] = useState(null);
  const [payload, setPayload] = useState({});
  const [connectStatus, setConnectStatus] = useState('Connect');

  const mqttConnect = (host, mqttOption) => {
    setConnectStatus('Connecting');
    setClient(mqtt.connect(host, mqttOption));
  };

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        setConnectStatus('Connected');
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting');
      });
      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() };
        setPayload(payload);
      });
    }
  }, [client]);

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        setConnectStatus('Connect');
      });
    }
  }

  const mqttPublish = (context) => {
    if (client) {
      let { topic, qos, patNum, alias, patType} = context;
      qos = 0;
      client.publish(topic, patNum, { qos }, error => {
        if (error) {
          console.log('Publish error: ', error);
        }
      });
      const msg = "Pat " + alias + " on " + patType + " " + patNum + " times~~";
      console.log(msg);
      const payload = { topic: msg };
      setPayload(payload);
    }
  }

  return (
    <>
      <div>
        <a href={"#"}> <img src={require('./amazonfuse.png')} className="fuseImage"/> </a>
      </div>
      <p></p>
      <Connection connect={mqttConnect} disconnect={mqttDisconnect} connectBtn={connectStatus} />
      <PatTypeOption.Provider value={patTypeOption}>
        <Publisher publish={mqttPublish} />
      </PatTypeOption.Provider>
        <Receiver payload={payload}/>
    </>
  );
}

export default HookMqtt;