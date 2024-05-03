import {create} from 'zustand';
import {v4 as uuid} from 'uuid';

const initialScenary = ({id = uuid(), name = ''} = {}) => ({id, name});

const useScenaryFormStore = create(set => ({
  scenary: initialScenary(),
  crearScenary: () => set({scenary: initialScenary()}),
  updateScenary: ({id, name}) => set({scenary: {id, name}}),
}));

export default useScenaryFormStore;
