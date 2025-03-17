import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Store = {
  matchInfos: any[];
  addMatchInfo: (newMatchInfo: any) => void;
  loadMatchInfos: () => void;
  clearStorage: () => void;
  deleteMatchInfo: (matchId: string) => void;
  updateMatchInfo: (matchId: string, updatedMatchInfo: Partial<any>) => void;
};

export const useMatchStore = create<Store>((set) => ({
  matchInfos: [],
  addMatchInfo: async (newMatchInfo: any) => {
    try {
      set((state) => {
        const updatedMatchInfos = [newMatchInfo, ...state.matchInfos];
        AsyncStorage.setItem("matchInfos", JSON.stringify(updatedMatchInfos));
        return { matchInfos: updatedMatchInfos };
      });
    } catch (error) {
      console.error("Error adding match info:", error);
    }
  },
  loadMatchInfos: async () => {
    try {
      const storedMatchInfos = await AsyncStorage.getItem("matchInfos");
      if (storedMatchInfos) {
        set({ matchInfos: JSON.parse(storedMatchInfos) });
      }
    } catch (error) {
      console.error("Error loading match infos:", error);
    }
  },
  deleteMatchInfo: async (matchId: any) => {
    try {
      set((state) => {
        const updatedMatchInfos = state.matchInfos.filter(
          (matchInfo) => matchInfo.matchId !== matchId
        );
        AsyncStorage.setItem("matchInfos", JSON.stringify(updatedMatchInfos));
        return { matchInfos: updatedMatchInfos };
      });
    } catch (error) {
      console.error("Error deleting match info:", error);
    }
  },
  clearStorage: async () => {
    try {
      await AsyncStorage.clear();
      set({ matchInfos: [] });
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  },
  updateMatchInfo: async (matchId, updatedMatchInfo) => {
    try {
      set((state) => {
        const updatedMatchInfos = state.matchInfos.map((matchInfo) =>
          matchInfo.matchId === matchId
            ? { ...matchInfo, ...updatedMatchInfo, matchId }
            : matchInfo
        );
        AsyncStorage.setItem("matchInfos", JSON.stringify(updatedMatchInfos));
        return { matchInfos: updatedMatchInfos };
      });
    } catch (error) {
      console.error("Error updating match info:", error);
    }
  },
}));
