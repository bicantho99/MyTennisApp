import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNoteStore } from "@/assets/noteData/data";

export default function Adding() {
  const { noteData, addNote, deleteNote, updateNote } = useNoteStore(); // Assuming setNoteData updates the store
  const { noteID } = useLocalSearchParams();
  const newNoteID = uuid.v4();
  // Find the selected note if editing, otherwise prep for a new note
  const selectedNote = noteData.find((item) => item.id == noteID);
  const isEditing = !!selectedNote;

  useEffect(() => {
    console.log(isEditing);
  }, []);
  // State for editing
  const [tempTitle, setTempTitle] = useState(selectedNote?.name || "");
  const [tempContent, setTempContent] = useState(selectedNote?.content || "");

  const colors = [
    "bg-red-100",
    "bg-pink-100",
    "bg-rose-100",
    "bg-orange-100",
    "bg-amber-100",
    "bg-yellow-100",
    "bg-lime-100",
    "bg-green-100",
    "bg-emerald-100",
    "bg-teal-100",
    "bg-cyan-100",
    "bg-sky-100",
    "bg-blue-100",
    "bg-indigo-100",
    "bg-violet-100",
    "bg-purple-100",
    "bg-fuchsia-100",
    "bg-gray-100",
    "bg-zinc-100",
    "bg-neutral-100",
    "bg-stone-100",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const handleAddNote = async () => {
    const newNote = {
      id: newNoteID,
      name: tempTitle,
      bgColor: randomColor,
      content: tempContent,
    };

    console.log(newNote);
    addNote(newNote);
    router.back(); // Navigate back after saving
  };
  const handleEdit = () => {
    updateNote(selectedNote?.id, {
      id: noteID,
      name: tempTitle,
      content: tempContent,
    });
    router.back();
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }} className="bg-bgColor">
      <SafeAreaView>
        <View className="mx-6 gap-5 pb-10">
          <View className="flex-row justify-between items-center mt-8">
            <Text className="text-textColor text-3xl font-bold">
              {isEditing ? "Edit Note" : "New Notes"}
            </Text>
            <View className="flex-row gap-6">
              <TouchableOpacity
                onPress={() => {
                  isEditing ? handleEdit() : handleAddNote();
                }}
              >
                <Text className="text-green-300 text-center text-[16px]  font-semibold">
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  deleteNote(selectedNote?.id);
                  router.back();
                }}
              >
                <Text className="text-orange-300 text-center text-[16px]  font-semibold">
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="section-view gap-3">
            <View>
              <TextInput
                className="bg-gray-800 p-5 mb-1 rounded-lg text-white"
                placeholder={selectedNote?.name || "Add Title"}
                placeholderTextColor="gray"
                value={tempTitle}
                onChangeText={setTempTitle}
              />
            </View>
            <TextInput
              className="bg-gray-800 px-3 pb-10 pt-4 rounded-xl text-white mt-2 h-[85%]"
              placeholder={selectedNote?.content || "Add Notes"}
              placeholderTextColor="gray"
              multiline
              value={tempContent}
              onChangeText={setTempContent}
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
