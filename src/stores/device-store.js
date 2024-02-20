import {create} from 'zustand';

export const useDeviceStore = create(set => ({
  homeId: null,
  environmentId: null,
  deviceId: null,
  setData: ({homeId, environmentId, deviceId}) =>
    set({homeId, environmentId, deviceId}),
  selectHomeId: homeId => set({homeId}),
  selectEnvironmentId: environmentId => set({environmentId}),
  selectDeviceId: deviceId => set({deviceId}),
}));
