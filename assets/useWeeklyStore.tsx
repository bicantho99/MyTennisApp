import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Challenge = {
  id: number;
  descr: string;
  text: string;
};

export const useWeeklyStore = create<any>((set) => ({
  challenges: [
    {
      id: 1,
      text: "Attack Opponent's Weeknesses",
      descr: "Either their FH, BH or Volley",
    },
    {
      id: 2,
      text: "Play Slower with Slice",
      descr: "Drop shot then lob over there head",
    },
    {
      id: 3,
      text: "Spam higher balls",
      descr: "Get it out of their striking zone",
    },
    {
      id: 4,
      text: "High Percentage Tennis",
      descr: "Don't aim too close to the line",
    },
    {
      id: 5,
      text: "Move them around",
      descr: "Hit 2 to the BH, 1 to the FH",
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
  addChallenge: async (newChallenge: any) => {
    set((state: any) => {
      const updatedChallenges = [newChallenge, ...state.challenges];
      AsyncStorage.setItem("challenges", JSON.stringify(updatedChallenges));
      return { challenges: updatedChallenges };
    });
  },
  loadChallenges: async () => {
    const storedChallengeInfos = await AsyncStorage.getItem("challenges");
    if (storedChallengeInfos) {
      set({ challenges: JSON.parse(storedChallengeInfos) });
    }
  },
  deleteChallenge: async (challengeID: any) => {
    set((state: any) => {
      const updatedChallenges = state.challenges.filter(
        (item: any) => item.id !== challengeID
      );
      AsyncStorage.setItem("challenges", JSON.stringify(updatedChallenges));
      return { challenges: updatedChallenges };
    });
  },
}));
