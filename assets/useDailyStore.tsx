import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Challenge = {
  id: number;
  text: string;
};

export const useDailyStore = create<any>((set) => ({
  dailyChallenges: [
    {
      id: 1,
      text: "Hit 4 Forehands in a row",
    },
    {
      id: 2,
      text: "Win 4 points with backhand slice",
    },
    {
      id: 3,
      text: "Serve 2 aces in T",
    },
    { id: 4, text: "Play like a pusher then aggressor" },
    {
      id: 5,
      text: "Hit 5 forehand volleys",
    },
    {
      id: 6,
      text: "Win 4 points with drop shots",
    },
    {
      id: 7,
      text: "Hit 3 backhand line winners",
    },
    {
      id: 8,
      text: "Hit 5 volley winners",
    },
    {
      id: 9,
      text: "3 FH in a row pass service line",
    },
    {
      id: 10,
      text: "3 BH in a row pass service line",
    },
    {
      id: 11,
      text: "Serve 2 aces in outwide",
    },
    {
      id: 12,
      text: "Hit 2 BH winner cross court",
    },
    {
      id: 13,
      text: "Hit 2 FH winner down the line",
    },
    {
      id: 14,
      text: "Use the 2-1 pattern (google it)",
    },
    {
      id: 15,
      text: "Approach to opponent's BH x5",
    },
    {
      id: 16,
      text: "Approach to opponent's FH x5",
    },
    {
      id: 17,
      text: "Serve volley to opponent's BH",
    },
    {
      id: 24,
      text: "Hit 5 Backhand drop shots",
    },
    {
      id: 18,
      text: "Hit a drive fh volley",
    },
    {
      id: 19,
      text: "Hit a drive fh volley",
    },
    {
      id: 20,
      text: "Drop shot and lob it over",
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
