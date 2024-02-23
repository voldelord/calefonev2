import {create} from 'zustand';

export const useLoadingOverlayStore = create(set => ({
  isLoading: false,
  setIsLoading: isLoading => set({isLoading}),
}));
