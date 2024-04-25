import {create} from 'zustand';
import {v4 as uuid} from 'uuid';

const initialHome = ({
  id = uuid(),
  name = '',
  address = '',
  isMain = false,
  latitude = '',
  longitude = '',
  inhabitants = [],
} = {}) => ({
  id,
  name,
  address,
  isMain,
  latitude,
  longitude,
  inhabitants,
});

const homeFormStore = create(set => ({
  home: initialHome(),
  clearHome: () => set({home: initialHome()}),
  updateHome: ({id, name, address, isMain, latitude, longitude, inhabitants}) =>
    set({home: {id, name, address, isMain, latitude, longitude, inhabitants}}),
}));

export default homeFormStore;
