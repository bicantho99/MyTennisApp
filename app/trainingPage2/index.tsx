import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { singleDataWeek1 } from "@/assets/singledata/data1";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { doubleData } from "@/assets/doubledata/data1";
import Checkbox from "expo-checkbox";
export default function profile() {
  const [warmCheck, setWarmCheck] = useState(false);
  const [mainCheck, setMainCheck] = useState(false);
  const [noteCheck, setNoteCheck] = useState(false);
  const { title, id } = useLocalSearchParams();
  let sections;
  if (Number(id) == 0) {
    sections = singleDataWeek1[title as keyof typeof singleDataWeek1];
  }
  if (Number(id) == 1) {
    sections = doubleData[title as keyof typeof doubleData];
  }
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-bgColor ">
      <KeyboardAwareScrollView>
        <View className="mx-6">
          <View className="flex-row items-center pt-2 justify-between">
            <TouchableOpacity onPress={() => router.back()} className="">
              <AntDesign name="arrowleft" size={26} color="white" />
            </TouchableOpacity>
            <View className="flex-1 items-center">
              <Text className="text-textColor text-2xl font-bold ">
                {title}
              </Text>
            </View>
          </View>

          <View className=" mt-8 p-3 rounded-xl border border-slate-600 ">
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
            <View className="flex-col gap-3 pl-3 mt-3">
              {sections["Warm Up"].drills.map((drill: any, index: any) => (
                <Text
                  key={index}
                  className="text-slate-300 text-lg font-medium"
                  style={{ marginVertical: 5 }}
                >
                  {index + 1}. {drill}
                </Text>
              ))}
            </View>
          </View>

          <View className=" mt-5 p-3 rounded-xl border border-slate-600">
            <View className="flex-row justify-between">
              <Text className="text-teal-300 text-xl pl-3 font-semibold">
                Main Drills
              </Text>
              <Checkbox
                value={mainCheck}
                onValueChange={() => setMainCheck((prev) => !prev)}
                color={mainCheck ? "#4630EB" : undefined}
              />
            </View>
            <View className="flex-col gap-3 pl-3 mt-3">
              {sections["Main Drills"].drills.map((drill: any, index: any) => (
                <Text
                  key={index}
                  className="text-slate-300 text-lg font-medium"
                  style={{ marginVertical: 5 }}
                >
                  - {drill}
                </Text>
              ))}
            </View>
          </View>
          <View className=" mt-5 p-3 rounded-xl border border-slate-700">
            <View className="flex-row justify-between">
              <Text className="text-fuchsia-300 text-xl pl-3 font-semibold">
                Notes
              </Text>
              <Checkbox
                value={noteCheck}
                onValueChange={() => setNoteCheck((prev) => !prev)}
                color={noteCheck ? "#4630EB" : undefined}
              />
            </View>
            <View className="flex-col gap-3 pl-3 mt-3">
              {sections["Main Drills"].notes.map((drill: any, index: any) => (
                <Text
                  key={index}
                  className="text-slate-300 text-lg font-medium"
                  style={{ marginVertical: 5 }}
                >
                  {drill}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
