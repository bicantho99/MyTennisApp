import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAttackStore = create<any>((set) => ({
  challenges: [
    {
      id: 1,
      text: "Spam Forehand All Day",
      descr: "Target opponent's BH",
    },
    {
      id: 2,
      text: "Slice and Come In All Day",
      descr: "Then hit an insane volley winner",
    },
    {
      id: 3,
      text: "Spam Serve and Volley",
      descr: "Finish the point quick",
    },
    {
      id: 4,
      text: "Only go for FH winner",
      descr: "Don't aim too close to the line",
    },
    {
      id: 5,
      text: "Spam FH Approach",
      descr: "Approach behind your FH",
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
      descr: "Get under the ball!!",
    },
  ],
  addAttack: async (newChallenge: any) => {
    set((state: any) => {
      const updatedChallenges = [newChallenge, ...state.challenges];
      AsyncStorage.setItem("challenges", JSON.stringify(updatedChallenges));
      return { challenges: updatedChallenges };
    });
  },
  loadAttack: async () => {
    const storedChallengeInfos = await AsyncStorage.getItem("challenges");
    if (storedChallengeInfos) {
      set({ challenges: JSON.parse(storedChallengeInfos) });
    }
  },
  deleteAttack: async (challengeID: any) => {
    set((state: any) => {
      const updatedChallenges = state.challenges.filter(
        (item: any) => item.id !== challengeID
      );
      AsyncStorage.setItem("challenges", JSON.stringify(updatedChallenges));
      return { challenges: updatedChallenges };
    });
  },
}));
