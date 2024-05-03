import {create} from 'zustand';

export const useDeviceStore = create((set, get) => ({
  homeId: null,
  environmentId: null,
  deviceId: null,
  setData: arg => {
    if (typeof arg === 'function') {
      arg({
        homeId: get().homeId,
        environmentId: get().environmentId,
        deviceId: get().deviceId,
      });
    }

    set(arg);
  },
  selectHomeId: homeId => set({homeId}),
  selectEnvironmentId: environmentId => set({environmentId}),
  selectDeviceId: deviceId => set({deviceId}),
}));
