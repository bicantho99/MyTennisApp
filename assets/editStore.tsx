import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Person {
  id: number;
  name: string;
  age: number;
}

interface PeopleStore {
  people: Person[];
  selectedPerson: Person | null;
  setSelectedPerson: (person: Person | null) => void;
  updatePerson: (id: number, name: string, age: number) => void;
}

export const usePeopleStore = create<PeopleStore>()(
  persist(
    (set) => ({
      people: [
        { id: 1, name: "John", age: 25 },
        { id: 2, name: "Emma", age: 30 },
        { id: 3, name: "Michael", age: 35 },
        { id: 4, name: "Sophie", age: 28 },
        { id: 5, name: "Alex", age: 40 },
      ],
      selectedPerson: null,
      setSelectedPerson: (person) => set({ selectedPerson: person }),
      updatePerson: (id, name, age) =>
        set((state) => ({
          people: state.people.map((p) =>
            p.id === id ? { ...p, name, age } : p
          ),
          selectedPerson: null, // Clear selection after update
        })),
    }),
    {
      name: "people-storage", // Unique key for the storage
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage as the storage engine
    }
  )
);
