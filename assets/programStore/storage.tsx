import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
type store = {
  programData: any;
  setProgramData: (program: any) => void;
  loadProgramData: () => void;
};
export const useProgramStore = create<store>((set) => ({
  programData: {
    0: {
      Week1: [
        {
          state: false,
          time: "45 Mins to 60 Mins",
          title: "The Underarm Serve",
          description: "Training focus on hitting underarm serves",
        },
        {
          state: false,
          time: "45 Mins to 60 Mins ",
          title: "The Hot-Dog",
          description: "Training focus on returning patterns",
        },
        {
          state: false,
          time: "45 Mins to 60 Mins ",
          title: "Practice Sets",
          description: "Implement what you practiced in real set",
        },
        {
          state: false,
          time: "45 Mins to 60 Mins ",
          title: "Nadal's Banana Forehand",
          description: "Discover the best baseline practices",
        },
      ],
      Week2: [
        {
          state: false,
          time: "45 Mins to 60 Mins",
          title: "Serving Patterns 2",
          description: "Training focus on serving patterns",
        },
        {
          state: false,
          time: "45 Mins to 60 Mins",
          title: "Returning Patterns 2",
          description: "Training focus on returning patterns",
        },
        {
          state: false,
          time: "45 Mins to 60 Mins",
          title: "Practice Sets 2",
          description:
            "Training focus on applying your patterns into matches",
        },
        {
          state: false,
          time: "45 Mins to 60 Mins",
          title: "Baseline Patterns 2",
          description: "Discover the best baseline practices",
        },
      ],
      Week3: [
        {
          state: false,
          time: "45 Mins to 60 Mins",
          title: "Serving Patterns 3",
          description: "Training focus on serving patterns",
        },
        {
          state: false,
          time: "45 Mins to 60 Mins",
          title: "The Underarm Serve",
          description: "Training focus on serving patterns",
        },
        {
          state: false,
          time: "45 Mins to 60 Mins",
          title: "Practice Sets 2",
          description:
            "Training focus on applying your patterns into matches",
        },
        {
          state: false,
          time: "45 Mins to 60 Mins",
          title: "The Hot-Dog",
          description: "Discover the best baseline practices",
        },
      ],
    },
    1: {
      Week1: [
        {
          state: false,
          time: "45 Mins to 60 Mins",
          title: "The Hot Dog",
          description: "Training focus on improving your volleys",
        },
        {
          state: false,
          time: "45 Mins to 60 Mins ",
          title: "The SABR",
          description: "Training focus on improving your volleys",
        },
        {
          state: false,
          time: "45 Mins to 60 Mins",
          title: "The Fake Overhead",
          description: "Training focus on improving your return",
        },
        {
          state: false,
          time: "45 Mins to 60 Mins",
          title: "Practice Sets",
          description: "Implement what you practiced in real set",
        },
      ],
      Week2: [
        {
          state: false,
          time: "45 Mins to 60 Mins",
          title: "Net Play Essentials 3",
          description: "Training focus on improving your volleys",
        },
        {
          state: false,
          time: "45 Mins to 60 Mins ",
          title: "Serve Essential",
          description: "Training focus on improving your serve",
        },
        {
          state: false,
          time: "45 Mins to 60 Mins",
          title: "The Fake Overhead",
          description: "Training focus on improving your return",
        },
        {
          state: false,
          time: "45 Mins to 60 Mins",
          title: "Practice Sets",
          description: "Implement what you practiced in real set",
        },
      ],
      Week3: [
        {
          state: false,
          time: "45 Mins to 60 Mins",
          title: "Net Play Essentials 3",
          description: "Training focus on improving your volleys",
        },
        {
          state: false,
          time: "45 Mins to 60 Mins ",
          title: "Returning Patterns 3",
          description: "Training focus on improving your return",
        },
        {
          state: false,
          time: "45 Mins to 60 Mins",
          title: "Planned Switch",
          description: "Training focus on poaching",
        },
        {
          state: false,
          time: "45 Mins to 60 Mins",
          title: "The Hot Dog",
          description: "Training focus on improving your volley",
        },
      ],
    },
  },
  loadProgramData: async () => {
    try {
      const savedData = await AsyncStorage.getItem("programData");
      if (savedData) {
        set({ programData: JSON.parse(savedData) });
      }
    } catch (error) {
      console.error("Error loading program data from AsyncStorage", error);
    }
  },
  setProgramData: async (newProgramData) => {
    try {
      // Save the new program data to AsyncStorage
      await AsyncStorage.setItem("programData", JSON.stringify(newProgramData));

      // Update the state with the new program data
      set({ programData: newProgramData });
    } catch (error) {
      console.error("Error saving program data to AsyncStorage", error);
    }
  },
}));
