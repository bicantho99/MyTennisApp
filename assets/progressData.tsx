import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
type Store = {
  checkedValues: number[];
  loadCheckedValues: () => void;
  toggleCheckedValue: (value: number) => void;
  addCheckedValue: (value: number) => void;
};

export const useCheckedValuesStore = create<Store>((set) => ({
  checkedValues: [],
  loadCheckedValues: async () => {
    try {
      const storedCheckedValues = await AsyncStorage.getItem("checkedValues");
      if (storedCheckedValues) {
        set({ checkedValues: JSON.parse(storedCheckedValues) });
      }
    } catch (error) {
      console.error("Error loading checked values from AsyncStorage", error);
    }
  },
  toggleCheckedValue: (value: number) => {
    set((state) => {
      const newArray = [...state.checkedValues]; // Create a shallow copy of the array
      const index = newArray.indexOf(value);
      if (index > -1) {
        newArray.splice(index, 1); // Remove the value if it exists
      } else {
        newArray.push(value); // Otherwise, add the value to the array
      }
      AsyncStorage.setItem("checkedValues", JSON.stringify(newArray)); // Save updated array to AsyncStorage
      return { checkedValues: newArray };
    });
  },
  addCheckedValue: (value: number) => {
    set((state) => {
      const newCheckedValues = [...state.checkedValues, value]; // Add the new value to the array
      AsyncStorage.setItem("checkedValues", JSON.stringify(newCheckedValues)); // Save updated array to AsyncStorage
      return { checkedValues: newCheckedValues }; // Update state
    });
  },
}));
