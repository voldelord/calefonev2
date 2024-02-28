import {create} from 'zustand';
import {v4 as uuid} from 'uuid';

const initialHome = ({id = uuid(), name = '', address = ''} = {}) => ({
  id,
  name,
  address,
});

const homeFormStore = create(set => ({
  home: initialHome(),
  clearHome: () => set({home: initialHome()}),
  updateHome: ({id, name, address}) => set({home: {id, name, address}}),
}));

export default homeFormStore;
