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
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTrainingStore } from "@/assets/trainingsData/data";
export default function Adding() {
  const { addTraining, trainingData } = useTrainingStore();
  const [trainings, setTraining] = useState<any>([]);
  const uniqueID = uuid.v4();

  const [selected, setSelected] = useState<number>(0);
  const activeBackgroundColor = "#b5f36b";
  const inactiveBackgroundColor = "#3b4451";

  const [title, setTitle] = useState<string>("");
  const [TDur, setTDur] = useState<string>("");
  const [TDef, setTDef] = useState<string>("");

  const items = ["Warm Up", "Main Drills", "Notes"];
  const [tabName, setTabName] = useState<keyof Drills>("Warm Up");
  const [drillName, setDrillName] = useState("");
  const [datedate, SetDatedate] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(false);
  const [drills, setDrills] = useState<Drills>({
    "Warm Up": [],
    "Main Drills": [],
    Notes: [],
  });

  interface Drills {
    "Warm Up": string[];
    "Main Drills": string[];
    Notes: string[];
  }

  const newProgram = {
    id: uniqueID,
    title: title,
    datedate: datedate,
    description: TDef,
    time: TDur,
    warmUp: drills["Warm Up"] || [],
    mainDrills: drills["Main Drills"] || [],
    Notes: drills.Notes || [],
  };
  const saveTraining = () => {
    console.log(newProgram);
    addTraining(newProgram);
  };

  const handleSubmit = () => {
    if (!drillName) {
      setError(true);
      return;
    }

    setDrills((prev: any) => ({
      ...prev,
      [tabName]: [...prev[tabName], drillName],
    }));

    setDrillName("");
    setDescription("");
    setDuration("");
    setError(false);
  };

  const handleRemove = (index: number) => {
    setDrills((prev: any) => {
      prev[tabName].splice(index, 1);
      return {
        ...prev,
      };
    });
  };
  return (
    <KeyboardAwareScrollView style={{ flex: 1 }} className="bg-bgColor">
      <View className="mx-6 gap-5 pb-10 pt-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-textColor text-3xl font-bold mt-5">
            New Training
          </Text>
          <TouchableOpacity
            onPress={() => {
              saveTraining();
              router.back();
            }}
          >
            <Text className="mt-5 text-[15px] font-medium text-green-300">
              Save
            </Text>
          </TouchableOpacity>
        </View>
        <View className="section-view gap-3">
          <TextInput
            className="bg-gray-800 py-5 px-4 mb-1 rounded-lg text-white "
            placeholder="Baseline Patterns"
            placeholderTextColor={"gray"}
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
          <View className="flex-row gap-5 ">
            <TextInput
              className="bg-gray-800  py-5 px-4 mb-1 rounded-lg text-white flex-[1.5]"
              placeholder="Wednesday, July 12"
              placeholderTextColor={"gray"}
              onChangeText={(text) => SetDatedate(text)}
              value={datedate}
            />
            <TextInput
              className="bg-gray-800 py-5 px-4 mb-1 rounded-md  flex-[1]   text-white"
              placeholder="4:00 PM "
              placeholderTextColor={"gray"}
              onChangeText={(text) => setTDur(text)}
              value={TDur}
            />
          </View>
          <Text className="text-[15px] font-medium text-slate-400">
            Description
          </Text>
          <TextInput
            className="bg-gray-800 px-3 pb-10 pt-5 rounded-lg   text-white"
            placeholder="Write Your Practice Description"
            placeholderTextColor={"gray"}
            onChangeText={(text) => setTDef(text)}
            value={TDef}
          />
        </View>
        <View className="section-view gap-3">
          <View className="flex-row justify-between items-center mt-[3px] mb-[5.5px]">
            {items.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    setSelected(index), setTabName(item as keyof Drills);
                  }}
                  className=""
                >
                  <Text
                    className={`${
                      selected === index
                        ? " text-[15px] border-2 border-teal-400 font-semibold  px-[10px] text-white rounded-lg py-3"
                        : "text-slate-400 text-[15px] px-[10px] font-semibold py-[11px] "
                    }  `}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <View className="NO  flex  gap-2  mb-3  min-h-[200px]  rounded border-b-2 border-gray-500   pb-10">
            {drills[tabName]?.length === 0 ? (
              <Text className="text-gray-600 mt-3 font-medium text-[19px] text-center w-[200px] mb-2 ">
                Add {tabName} Below
              </Text>
            ) : (
              <View className="">
                {drills[tabName].map((items: any, index: any) => (
                  <View
                    className="tasks-view py-4  px-4 rounded-md  flex-row gap-2  mt-2 border border-dotted border-teal-300  bg-teal-900/20 justify-between items-center"
                    key={index}
                  >
                    <View className="flex-row gap-2 ">
                      <Text className="text-pink-400 font-medium text-[17px]">
                        {`${index + 1}.`}
                      </Text>
                      <Text className="text-white text-[17px] font-medium">
                        {items}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        handleRemove(index);
                      }}
                    >
                      <Ionicons name="remove" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>

          <TextInput
            className="bg-gray-800 py-5 px-4  text-white rounded-xl"
            placeholder="Drill name"
            placeholderTextColor={"gray"}
            onChangeText={(text) => setDrillName(text)}
            value={drillName}
          />

          {error ? (
            <Text className="text-slate-400 text-lg">Please drill name</Text>
          ) : null}

          <TouchableOpacity
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text className="mt-5 font-bold text-green-300 text-center text-[19px]">
              Add Drill
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
