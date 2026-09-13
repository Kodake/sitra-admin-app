import { create } from "zustand";

interface LoadingStore {
  activeRequests: number;
  isNavigating: boolean;
  isLoading: boolean;
  startRequest: () => void;
  endRequest: () => void;
  startNavigating: () => void;
  stopNavigating: () => void;
  reset: () => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  activeRequests: 0,
  isNavigating: false,
  isLoading: false,

  startRequest: () =>
    set((state) => {
      const nextCount = state.activeRequests + 1;
      return {
        activeRequests: nextCount,
        isLoading: true,
      };
    }),

  endRequest: () =>
    set((state) => {
      const nextCount = Math.max(0, state.activeRequests - 1);
      return {
        activeRequests: nextCount,
        isLoading: nextCount > 0 || state.isNavigating,
      };
    }),

  startNavigating: () =>
    set((state) => ({
      isNavigating: true,
      isLoading: true,
    })),

  stopNavigating: () =>
    set((state) => ({
      isNavigating: false,
      isLoading: state.activeRequests > 0,
    })),

  reset: () =>
    set({
      activeRequests: 0,
      isNavigating: false,
      isLoading: false,
    }),
}));
