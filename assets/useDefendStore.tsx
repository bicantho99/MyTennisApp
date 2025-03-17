import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useDefendStore = create<any>((set) => ({
  challenges: [
    {
      id: 1,
      text: "Spam Moon Ball",
      descr: "Slow it down and frustrate",
    },
    {
      id: 2,
      text: "Spam slices",
      descr: "Slices then a few top spin",
    },
    {
      id: 3,
      text: "Spam Cross Court",
      descr: "Cross court and stay in the point",
    },
    {
      id: 4,
      text: "High Percentage Tennis",
      descr: "Don't aim too close to the line",
    },
    {
      id: 5,
      text: "Improving My Footwork",
      descr: "Get on your tip-toe",
    },
    {
      id: 6,
      text: "Groundstrokes Depth",
      descr: "Aim higher over the net for depth",
    },
    {
      id: 7,
      text: "Bigger Target Placement",
      descr: "Don't aim for the line",
    },
    {
      id: 8,
      text: "Higher Net Clearance",
      descr: "Get under the ball",
    },
  ],
  addDefense: async (newChallenge: any) => {
    set((state: any) => {
      const updatedChallenges = [newChallenge, ...state.challenges];
      AsyncStorage.setItem("challenges", JSON.stringify(updatedChallenges));
      return { challenges: updatedChallenges };
    });
  },
  loadDefense: async () => {
    const storedChallengeInfos = await AsyncStorage.getItem("challenges");
    if (storedChallengeInfos) {
      set({ challenges: JSON.parse(storedChallengeInfos) });
    }
  },
  deleteDefense: async (challengeID: any) => {
    set((state: any) => {
      const updatedChallenges = state.challenges.filter(
        (item: any) => item.id !== challengeID
      );
      AsyncStorage.setItem("challenges", JSON.stringify(updatedChallenges));
      return { challenges: updatedChallenges };
    });
  },
}));
