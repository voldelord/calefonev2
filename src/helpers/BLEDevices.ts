import {
  ESPDevice,
  ESPTransport,
  ESPSecurity,
  ESPProvisionManager,
  ESPWifiList,
  ESPStatusResponse,
} from '@orbital-systems/react-native-esp-idf-provisioning';
import {sleep} from './sleep';
import {hostIp} from './createAxios';

class FakeDevice extends ESPDevice {
  async scanWifiList(): Promise<ESPWifiList[]> {
    await sleep(2000);

    return [
      {auth: 3, rssi: 10, ssid: 'One_work'},
      {auth: 3, rssi: 10, ssid: 'Fibextel'},
    ];
  }

  async connect(
    proofOfPossession?: string | null | undefined,
    softAPPassword?: string | null | undefined,
    username?: string | null | undefined,
  ): Promise<void> {
    this.connected = true;
  }

  disconnect(): void {
    this.connected = false;
  }

  async sendData(path: string, data: string): Promise<string> {
    return 'beadeb48-d743-4b52-af59-4cc827d16c93';
  }

  async provision(
    ssid: string,
    passphrase: string,
  ): Promise<ESPStatusResponse> {
    return {
      status: 'connected',
    };
  }
}

export const findDevices = async () => {
  // await sleep(2000);

  // return [
  //   new FakeDevice({
  //     name: 'PROV_121231',
  //     transport: ESPTransport.ble,
  //     security: ESPSecurity.secure,
  //   }),
  //   new FakeDevice({
  //     name: 'PROV_234345',
  //     transport: ESPTransport.ble,
  //     security: ESPSecurity.secure,
  //   }),
  // ];
  return await ESPProvisionManager.searchESPDevices(
    'PROV_',
    ESPTransport.ble,
    ESPSecurity.secure,
  );
};

export const getWifiListForDevice = async (device: ESPDevice) => {
  return await device.scanWifiList();
};

export const sendServerDataToDevice = async (device: ESPDevice) => {
  return (
    await device.sendData(
      'custom-data',
      JSON.stringify({mqttServer: `${hostIp}:1883`}),
    )
  ).replaceAll('\0', '');
};

export const provisionDevice = async (
  device: ESPDevice,
  ssid: string,
  password: string,
) => {
  return await device.provision(ssid, password);
};
