import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";


type Training = {
  id: string | number;
  title?: string;
  datedate?: string; // or Date if you use Date objects
  description?: string;
  time?: string; // or number if you use duration in minutes
  warmUp?: string[];
  mainDrills?: string[];
  Notes?: string[];
};

type Store = {
  trainingData: Training[];
  addTraining: (newMatchInfo: Training) => void;
  loadTrainings: () => void;
  clearTrainingStorage: () => void;
  deleteTraining: (matchId: number) => void;
  updateTraining: (matchId: number | string, data: Partial<Training>) => void;
};

export const useTrainingStore = create<Store>()(
  persist(
    (set) => ({
      trainingData: [],
      addTraining: (newMatchInfo) =>
        set((state) => ({
          trainingData: [newMatchInfo, ...state.trainingData],
        })),
      loadTrainings: () => {
        // No-op; persistence handled by middleware
      },
      deleteTraining: (matchId) =>
        set((state) => ({
          trainingData: state.trainingData.filter(
            (item) => item.id !== matchId
          ),
        })),
      clearTrainingStorage: () => set({ trainingData: [] }),
      updateTraining: (Id, data) =>
        set((state) => ({
          trainingData: state.trainingData.map((item) =>
            item.id === Id ? { ...item, ...data } : item
          ),
        })),
    }),
    {
      name: "training-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
