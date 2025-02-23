import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useTrainingStore } from "@/assets/trainingsData/data";

export default function Adding() {
  type Training = {
    id: string | number;
    title?: string;
    datedate?: string;
    description?: string;
    time?: string;
    warmUp?: string[];
    mainDrills?: string[];
    Notes?: string[];
  };

  const router = useRouter();
  const { editTraining } = useLocalSearchParams();
  const { trainingData, updateTraining } = useTrainingStore();
  const [selected, setSelected] = useState<number>(0);
  const selectedTraining = trainingData.find(
    (item) => item.id === editTraining
  );

  const [editTitle, setEditTitle] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editDescr, setDescr] = useState("");
  const [warmUpItems, setWarmUpItems] = useState<string[]>([]);
  const [mainDrill, setMainDrill] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [newWarmUpItem, setNewWarmUpItem] = useState("");
  const [newMainDrill, setNewMainDrill] = useState("");
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    if (selectedTraining) {
      setEditTitle(selectedTraining.title || "");
      setEditTime(selectedTraining.time || "");
      setEditDate(selectedTraining.datedate || "");
      setDescr(selectedTraining.description || "");
      setWarmUpItems(selectedTraining.warmUp || []);
      setMainDrill(selectedTraining.mainDrills || []);
      setNotes(selectedTraining.Notes || []);
    }
  }, [selectedTraining]);

  const handleEditTraining = () => {
    if (!selectedTraining) return;

    updateTraining(selectedTraining.id, {
      title: editTitle,
      time: editTime,
      datedate: editDate,
      description: editDescr,
      warmUp: warmUpItems,
      mainDrills: mainDrill,
      Notes: notes,
    });
    router.back();
  };

  const handleAddWarmUp = () => {
    if (newWarmUpItem.trim()) {
      setWarmUpItems([...warmUpItems, newWarmUpItem.trim()]);
      setNewWarmUpItem("");
    }
  };

  const handleAddMainDrill = () => {
    if (newMainDrill.trim()) {
      setMainDrill([...mainDrill, newMainDrill.trim()]);
      setNewMainDrill("");
    }
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote.trim()]);
      setNewNote("");
    }
  };

  const handleRemoveWarmUp = (indexToRemove: number) => {
    setWarmUpItems(warmUpItems.filter((_, index) => index !== indexToRemove));
  };

  const handleRemoveMain = (indexToRemove: number) => {
    setMainDrill(mainDrill.filter((_, index) => index !== indexToRemove));
  };

  const handleRemoveNote = (indexToRemove: number) => {
    setNotes(notes.filter((_, index) => index !== indexToRemove));
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }} className="bg-bgColor">
      <View className="mx-6 gap-5 pb-10 pt-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-textColor text-3xl font-bold mt-5">
            {selectedTraining ? "Edit Training" : "New Training"}
          </Text>
          <TouchableOpacity onPress={handleEditTraining}>
            <Text className="mt-5 text-[15px] font-medium text-green-300">
              Save
            </Text>
          </TouchableOpacity>
        </View>

        <View className="section-view gap-3">
          <TextInput
            className="bg-gray-800 py-5 px-4 mb-1 rounded-lg text-white"
            placeholder={selectedTraining?.title || "Training Title"}
            placeholderTextColor={"gray"}
            onChangeText={setEditTitle}
            value={editTitle}
          />
          <View className="flex-row gap-5">
            <TextInput
              className="bg-gray-800 py-5 px-4 mb-1 rounded-lg text-white flex-[1.5]"
              placeholder={selectedTraining?.datedate || "Date"}
              placeholderTextColor={"gray"}
              onChangeText={setEditDate}
              value={editDate}
            />
            <TextInput
              className="bg-gray-800 py-5 px-4 mb-1 rounded-md flex-[1] text-white"
              placeholder={selectedTraining?.time || "Time"}
              placeholderTextColor={"gray"}
              onChangeText={setEditTime}
              value={editTime}
            />
          </View>
          <Text className="text-[15px] font-medium text-slate-400">
            Description
          </Text>
          <TextInput
            className="bg-gray-800 px-3 pb-10 pt-5 rounded-lg text-white"
            placeholder={selectedTraining?.description || "Description"}
            placeholderTextColor={"gray"}
            onChangeText={setDescr}
            value={editDescr}
            multiline
          />
        </View>

        <SegmentedControl
          values={["Warm Up", "Main Drills", "Notes"]}
          selectedIndex={selected}
          onChange={(event) => {
            setSelected(event.nativeEvent.selectedSegmentIndex);
          }}
          style={{ marginBottom: 20 }}
        />

        {selected === 0 && (
          <WarmUp
            warmUpItems={warmUpItems}
            handleRemoveWarmUp={handleRemoveWarmUp}
            handleAddWarmUp={handleAddWarmUp}
            setNewWarmUpItem={setNewWarmUpItem}
            newWarmUpItem={newWarmUpItem}
          />
        )}
        {selected === 1 && (
          <MainDrills
            mainDrill={mainDrill}
            handleRemoveMain={handleRemoveMain}
            handleAddMainDrill={handleAddMainDrill}
            setNewMainDrill={setNewMainDrill}
            newMainDrill={newMainDrill}
          />
        )}
        {selected === 2 && (
          <NotesSection
            notes={notes}
            handleRemoveNote={handleRemoveNote}
            handleAddNote={handleAddNote}
            setNewNote={setNewNote}
            newNote={newNote}
          />
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}

function WarmUp({
  warmUpItems,
  handleRemoveWarmUp,
  handleAddWarmUp,
  setNewWarmUpItem,
  newWarmUpItem,
}: any) {
  return (
    <View className="section-view gap-3">
      <View className="flex gap-2 mb-3 min-h-[200px] rounded border-b-2 border-gray-500 pb-10">
        {warmUpItems.map((item: string, index: number) => (
          <View
            className="tasks-view py-4 px-4 rounded-md flex-row gap-2 mt-2 border border-dotted border-teal-300 bg-teal-900/20 justify-between items-center"
            key={index}
          >
            <View className="flex-row gap-2">
              <Text className="text-pink-400 font-medium text-[17px]">{`${
                index + 1
              }.`}</Text>
              <Text className="text-white text-[17px] font-medium">{item}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRemoveWarmUp(index)}>
              <Ionicons name="remove" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TextInput
        className="bg-gray-800 py-5 px-4 text-white rounded-xl"
        placeholder="Drill name"
        placeholderTextColor={"gray"}
        onChangeText={setNewWarmUpItem}
        value={newWarmUpItem}
      />
      <TouchableOpacity onPress={handleAddWarmUp}>
        <Text className="mt-5 font-bold text-green-300 text-center text-[19px]">
          Add Drill
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function MainDrills({
  mainDrill,
  handleRemoveMain,
  handleAddMainDrill,
  setNewMainDrill,
  newMainDrill,
}: any) {
  return (
    <View className="section-view gap-3">
      <View className="flex gap-2 mb-3 min-h-[200px] rounded border-b-2 border-gray-500 pb-10">
        {mainDrill.map((item: string, index: number) => (
          <View
            className="tasks-view py-4 px-4 rounded-md flex-row gap-2 mt-2 border border-dotted border-teal-300 bg-teal-900/20 justify-between items-center"
            key={index}
          >
            <View className="flex-row gap-2">
              <Text className="text-pink-400 font-medium text-[17px]">{`${
                index + 1
              }.`}</Text>
              <Text className="text-white text-[17px] font-medium">{item}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRemoveMain(index)}>
              <Ionicons name="remove" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TextInput
        className="bg-gray-800 py-5 px-4 text-white rounded-xl"
        placeholder="Main Drill name"
        placeholderTextColor={"gray"}
        onChangeText={setNewMainDrill}
        value={newMainDrill}
      />
      <TouchableOpacity onPress={handleAddMainDrill}>
        <Text className="mt-5 font-bold text-green-300 text-center text-[19px]">
          Add Main Drill
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function NotesSection({
  notes,
  handleRemoveNote,
  handleAddNote,
  setNewNote,
  newNote,
}: any) {
  return (
    <View className="section-view gap-3">
      <View className="flex gap-2 mb-3 min-h-[200px] rounded border-b-2 border-gray-500 pb-10">
        {notes.map((item: string, index: number) => (
          <View
            className="tasks-view py-4 px-4 rounded-md flex-row gap-2 mt-2 border border-dotted border-teal-300 bg-teal-900/20 justify-between items-center"
            key={index}
          >
            <View className="flex-row gap-2">
              <Text className="text-pink-400 font-medium text-[17px]">{`${
                index + 1
              }.`}</Text>
              <Text className="text-white text-[17px] font-medium">{item}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRemoveNote(index)}>
              <Ionicons name="remove" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TextInput
        className="bg-gray-800 py-5 px-4 text-white rounded-xl"
        placeholder="Note"
        placeholderTextColor={"gray"}
        onChangeText={setNewNote}
        value={newNote}
      />
      <TouchableOpacity onPress={handleAddNote}>
        <Text className="mt-5 font-bold text-green-300 text-center text-[19px]">
          Add Note
        </Text>
      </TouchableOpacity>
    </View>
  );
}
