import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Note {
  id: any;
  name: string;
  bgColor: string;
  content: string;
}

interface NoteStore {
  noteData: Note[];
  addNote: (note: Note) => void; // Create
  updateNote: (id: any, updatedNote: Partial<Note>) => void; // Update
  deleteNote: (name: string) => void; // Delete
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set, get) => ({
      noteData: [
        {
          id: 1,
          name: "Achievements",
          bgColor: "bg-orange-100",
          content:
            "Won sectional mixed, made it to national for tri levels, won national...",
        },
        {
          id: 2,
          name: "Rivals",
          bgColor: "bg-teal-100",
          content:
            "Jakub has great FH, attack his BH instead and make him run...",
        },
        {
          id: 3,
          name: "Goals",
          bgColor: "bg-red-100",
          content:
            "Win more nationals, beat higher utr, win more matches",
        },
        {
          id: 4,
          name: "Techniques",
          bgColor: "bg-blue-100",
          content:
            "Aggressive serve and net rush, fast transition,...",
        },
      ],
      // Add a new note
      addNote: (note: Note) =>
        set((state) => ({
          noteData: [...state.noteData, note],
        })),

      // Update an existing note by name
      updateNote: (id: any, updatedNote: Partial<Note>) =>
        set((state) => ({
          noteData: state.noteData.map((note) =>
            note.id === id ? { ...note, ...updatedNote } : note
          ),
        })),

      // Delete a note by name
      deleteNote: (id: any) =>
        set((state) => ({
          noteData: state.noteData.filter((note) => note.id !== id),
        })),
    }),
    {
      name: "note-storage", // Unique key for AsyncStorage
      storage: createJSONStorage(() => AsyncStorage), // Persist to AsyncStorage
    }
  )
);
