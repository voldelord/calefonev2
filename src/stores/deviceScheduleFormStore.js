import {create} from 'zustand';
import {v4 as uuid} from 'uuid';

export const initialDeviceSchedule = ({
  id = uuid(),
  startTime = '',
  endTime = '',
  recurrence = [],
  deviceId = '',
  isActive = true,
} = {}) => ({id, startTime, endTime, recurrence, deviceId, isActive});

const useDeviceScheduleFormStore = create(set => ({
  deviceSchedule: initialDeviceSchedule(),
  crearDeviceSchedule: () => set({deviceSchedule: initialDeviceSchedule()}),
  updateDeviceSchedule: ({
    id,
    startTime,
    endTime,
    recurrence,
    deviceId,
    isActive,
  }) =>
    set({
      deviceSchedule: {id, startTime, endTime, recurrence, deviceId, isActive},
    }),
}));

export default useDeviceScheduleFormStore;
