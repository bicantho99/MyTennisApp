import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTrainingStore } from "@/assets/trainingsData/data";
import Checkbox from "expo-checkbox";

export default function Profile() {
  const [warmCheck, setWarmCheck] = useState(false);
  const [mainCheck, setMainCheck] = useState(false);
  const [noteCheck, setNoteCheck] = useState(false);
  const { trainingIDX } = useLocalSearchParams();
  const { loadTrainings, trainingData, deleteTraining } = useTrainingStore();
  const actualTraining = trainingData.find(
    (item: any) => item.id == trainingIDX
  );

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }} className="bg-bgColor">
      <SafeAreaView>
        <View className="mx-6 gap-4">
          <View className="flex-row  justify-between m-4">
            <TouchableOpacity onPress={() => router.back()} className="">
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
            <View className=" flex-1 items-center mr-3">
              <Text className="text-textColor text-2xl font-bold ">
                {actualTraining?.title}
              </Text>
            </View>
          </View>
          {actualTraining?.warmUp.length > 0 && (
            <View className="p-3 rounded-xl border border-slate-600">
              <View className="flex-row justify-between">
                <Text className="text-blue-300 text-xl pl-3 font-semibold">
                  Warm Up
                </Text>
                <Checkbox
                  value={warmCheck}
                  onValueChange={() => setWarmCheck((prev) => !prev)}
                  color={warmCheck ? "#4630EB" : undefined}
                />
              </View>
              <View className="flex-col gap-3 pl-3 mt-3 pb-1">
                {actualTraining?.warmUp.map((drill: any, index: any) => (
                  <Text
                    key={index}
                    style={{ marginVertical: 5 }}
                    className="text-slate-300 text-lg font-medium "
                  >
                    - {drill}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Main Drills */}
          {actualTraining?.mainDrills.length > 0 && (
            <View className="p-3 rounded-xl border border-slate-600">
              <View className="flex-row justify-between">
                <Text className="text-blue-300 text-xl pl-3 font-semibold">
                  Main Drills
                </Text>
                <Checkbox
                  value={mainCheck}
                  onValueChange={() => setMainCheck((prev) => !prev)}
                  color={mainCheck ? "#4630EB" : undefined}
                />
              </View>
              <View className="flex-col gap-3 pl-3 mt-3 pb-1">
                {actualTraining?.mainDrills.map((drill: any, index: any) => (
                  <Text
                    key={index}
                    style={{ marginVertical: 5 }}
                    className="text-slate-300 text-lg font-medium"
                  >
                    - {drill}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Notes */}
          {actualTraining?.Notes.length > 0 && (
            <View className="p-3 rounded-xl border border-slate-500">
              <View className="flex-row justify-between">
                <Text className="text-blue-300 text-xl pl-3 font-semibold">
                  Notes
                </Text>
              </View>
              <View className="flex-col gap-3 pl-3 mt-3 pb-1">
                {actualTraining?.Notes.map((drill: any, index: any) => (
                  <Text
                    key={index}
                    style={{ marginVertical: 5 }}
                    className="text-slate-300 text-lg font-medium"
                  >
                    - {drill}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Delete Training */}
          <View className="drills mb-4">
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => router.back()}
                className="  bg-teal-600 rounded-xl p-3 mt-6 flex-1 mx-2"
              >
                <Text className="text-center  text-slate-100 font-bold text-xl ">
                  Complete
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  router.back();
                  deleteTraining(actualTraining.id);
                }}
                className="bg-red-600 rounded-xl p-3 mt-6 flex-1 mx-2 "
              >
                <Text className="text-center text-slate-300 font-bold text-xl ">
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
