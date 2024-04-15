import {create} from 'zustand';
import {v4 as uuid} from 'uuid';

const initialHome = ({
  id = uuid(),
  name = '',
  address = '',
  isMain = false,
  latitude = '',
  longitude = '',
} = {}) => ({
  id,
  name,
  address,
  isMain,
  latitude,
  longitude,
});

const homeFormStore = create(set => ({
  home: initialHome(),
  clearHome: () => set({home: initialHome()}),
  updateHome: ({id, name, address, isMain, latitude, longitude}) =>
    set({home: {id, name, address, isMain, latitude, longitude}}),
}));

export default homeFormStore;
