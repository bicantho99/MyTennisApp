import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import uuid from "react-native-uuid";
import React, { useState } from "react";
import { useDefendStore } from "../../../assets/useDefendStore";

export default function Adding() {
  const { addDefense, loadDefense, deleteDefense, challenges } = useDefendStore();
  const [text, setName] = useState("");
  const [descr, setDescr] = useState("");
  const randomId = uuid.v4();
  const handleSubmit = () => {
    const newChallenge = { text, descr, randomId };
    addDefense(newChallenge);
  };
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-bgColor">
      <View className="mx-6 gap-5 pb-10 pt-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-textColor text-3xl font-semi mt-5">
            I'm Working On:
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Text className="mt-5 text-[15px] font-medium text-green-300">
              Close
            </Text>
          </TouchableOpacity>
        </View>

        <View className="gap-3 flex-col">
          <TextInput
            className="text-white p-5 bg-slate-800 rounded-lg"
            placeholder="Serve and Volley"
            value={text}
            onChangeText={setName}
          />
          <View className="flex-row gap-4 items-center">
            <TextInput
              className="text-white p-5 bg-slate-800 rounded-lg flex-1"
              placeholder="Note: Volley to open court"
              value={descr}
              onChangeText={setDescr}
            />
            <TouchableOpacity onPress={() => handleSubmit()}>
              <Text className="text-slate-300 font-bold text-lg bg-slate-800 p-4 rounded-xl">
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="">
          <FlatList
            data={challenges}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View className="rounded-xl gap-3 p-2  mt-[8.3px]">
                <View className="flex-row justify-between items-center">
                  <Text className="text-[16px] text-slate-200 font-semibold">
                    {item.text}
                  </Text>
                  <TouchableOpacity onPress={() => deleteDefense(item.id)}>
                    <Text className="text-slate-400">Delete</Text>
                  </TouchableOpacity>
                </View>
                <Text className="font-semibold opacity-[0.5px] text-white">
                  {item.descr}
                </Text>
              </View>
            )}
            ItemSeparatorComponent={() => (
              <View className="h-[1px] bg-gray-500 mx-2" />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
