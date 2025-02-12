import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Store = {
  trainingData: any;
  addTraining: (newMatchInfo: any) => void;
  loadTrainings: () => void;
  clearTrainingStorage: () => void;
  deleteTraining: (matchId: number) => void;
};

export const useTrainingStore = create<Store>((set) => ({
  trainingData: [],
  addTraining: async (newMatchInfo) => {
    set((state) => {
      const updatedMatchInfos = [ newMatchInfo,...state.trainingData];
      AsyncStorage.setItem("trainingInfos", JSON.stringify(updatedMatchInfos));
      return { trainingData: updatedMatchInfos };
    });
  },
  loadTrainings: async () => {
    const storedMatchInfos = await AsyncStorage.getItem("trainingInfos");
    if (storedMatchInfos) {
      set({ trainingData: JSON.parse(storedMatchInfos) });
    }
  },
  deleteTraining: async (matchId) => {
    set((state) => {
      const updatedTrainingInfos = state.trainingData.filter(
        (item: any) => item.id !== matchId
      );
      AsyncStorage.setItem(
        "trainingInfos",
        JSON.stringify(updatedTrainingInfos)
      );
      return { trainingData: updatedTrainingInfos };
    });
  },
  clearTrainingStorage: async () => {
    await AsyncStorage.clear();
    set({ trainingData: null });
  },
}));
