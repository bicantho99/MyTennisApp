import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import Checkbox from "expo-checkbox";
import { useLocalSearchParams } from "expo-router";
import { useCheckedValuesStore } from "@/assets/progressData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useProgramStore } from "@/assets/programStore/storage";
export default function ProgramPage() {
  const { trainingId } = useLocalSearchParams();
  const { programData, setProgramData, loadProgramData } = useProgramStore();
  const { addCheckedValue, toggleCheckedValue, checkedValues } =
    useCheckedValuesStore();
  const [tested, setTest] = useState<any>([]);
  const trainingIdNumber = Number(trainingId);
  const weeks = [
    programData[trainingIdNumber].Week1,
    programData[trainingIdNumber].Week2,
    programData[trainingIdNumber].Week3,
  ];
  const [selectedWeek, setSelectedWeek] = useState(0);

  const handleCheckboxChange = (index: number, value: boolean) => {
    const updatedProgramData = { ...programData };
    const currentWeekIndex = selectedWeek;

    updatedProgramData[trainingIdNumber] = {
      ...updatedProgramData[trainingIdNumber],
    };
    updatedProgramData[trainingIdNumber][`Week${currentWeekIndex + 1}`] = [
      ...updatedProgramData[trainingIdNumber][`Week${currentWeekIndex + 1}`],
    ];
    updatedProgramData[trainingIdNumber][`Week${currentWeekIndex + 1}`][index] =
      {
        ...updatedProgramData[trainingIdNumber][`Week${currentWeekIndex + 1}`][
          index
        ],
        state: value,
      };

    setProgramData(updatedProgramData);
  };

  const renderOut = [];
  const fullText = `"This practice focuses on solid SABR and underarm serves along with around-the-net shots to make sure you stay cool even when you're not winning"`;
  const truncatedText = "This practice focuses on solid...";
  const fullText1 = "";
  const truncatedText2 = "";
  const coach = ["Cecile", "Jakub"];
  const [showFullText, setShowFullText] = useState(false);

  return (
    <SafeAreaView className="bg-bgColor flex-1">
      <View className="mx-6 ">
        <View className="flex-row gap-3 pt-2">
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>

          <Text className="text-textColor font-medium text-xl">
            Program Overview
          </Text>
        </View>
        <ScrollView>
          <View className="mid-view mt-5  pb-2 flex-row justify-between px-1">
            {weeks.map((_, index) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedWeek(index);
                }}
                key={index}
              >
                <Text
                  className={`text-xl text-center font-medium ${
                    selectedWeek === index
                      ? "text-teal-400  bg-slate-800"
                      : "text-textColor"
                  } p-2 px-7 rounded-lg `}
                >
                  Week {index + 1}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* <View className="flex-row gap-2 justify-evenly mt-3 ">
            {[0, 0, 0, 0].map((_, index) => (
              <View
                key={index}
                // key={index}
                className={`h-[7px] flex-row rounded-lg ${
                  checkedValues.length > index ? "bg-teal-400" : "bg-slate-700"
                } w-[80px] transition duration-250 ease-in delay-100`}
              />
            ))}
          </View> */}

          <View className="coach flex-row mt-5 gap-4">
            <View className="flex items-center justify-center bg-slate-400 h-14 w-14 rounded-[19px]">
              <Text className=" rounded-[50px] text-center">
                {Number(trainingId) === 0 ? "Cecile" : "Jakub"}
              </Text>
            </View>
            <View className="flex-col">
              <Text className="text-slate-100 font-medium">
                {Number(trainingId) === 0 ? "Coach Cecile" : "Coach Jakub"}
              </Text>
              <Pressable onPress={() => setShowFullText(!showFullText)}>
                <View className="flex-row mt-2 w-[290px]">
                  <Text className="text-textColor ">
                    {showFullText ? fullText : truncatedText}
                  </Text>
                  <Text className="text-slate-400 text-[14px] ml-2">
                    {showFullText ? "" : "See more"}
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* <View>{switchCases()}</View> */}

          <View className="mt-6 gap-4">
            {weeks[selectedWeek].map((session: any, index: any) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  router.push({
                    pathname: "/trainingPage2",
                    params: {
                      title: session.title,
                      id: trainingId,
                    },
                  });
                  console.log(session.title);
                }}
              >
                <View>
                  <View
                    className={`box-view box-border bg-gray-800 pl-5 pr-3 py-5 rounded-xl gap-[5px] ${
                      index % 2 === 0 ? "border-teal-400" : "border-blue-400"
                    } border-l-[14px] border-[0.4px]`}
                  >
                    <View className="text-view gap-2">
                      <View className="flex-row justify-between">
                        <Text className="text-textColor font-semibold">
                          {session.time}
                        </Text>
                        <Checkbox
                          key={index}
                          value={session.state}
                          onValueChange={(value) =>
                            handleCheckboxChange(index, value)
                          }
                          color={session.state ? "#16a34a" : undefined}
                        />
                      </View>
                      <Text className="text-blue-300 font-bold text-[17px]">
                        {session.title}
                      </Text>
                      <Text className="text-gray-400 font-semibold mt-2">
                        {session.description}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
