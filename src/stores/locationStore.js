import {create} from 'zustand';

const useLocationStore = create(set => ({
  locations: [],
  location: null,
  updateLocation: ({lat, long}) =>
    set(state => ({
      locations: [...state.locations, {lat, long}],
      location: {lat, long},
    })),
}));

export default useLocationStore;
