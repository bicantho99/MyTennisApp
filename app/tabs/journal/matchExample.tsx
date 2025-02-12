import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { Rating } from "@kolking/react-native-rating";
import React from "react";

export default function matchExample() {
  const actualMatch = {
    player1: "Khanh Nguyen",
    player2: "Jakub Novak",
    player1_1s: 6,
    player2_1s: 4,
    player1_2s: 6,
    player2_2s: 4,
    matchNote: "I played insane today, keep on hitting bigger forehands.",
    strat: 4.5,
    techni: 4.8,
    mental: 4.2,
    physical: 4.7,
    matchId: "12345",
  };

  return (
    <SafeAreaView className="bg-bgColor flex-1">
      <View className="mx-6">
        <View className="flex-row items-center ">
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-cyan-300 text-center text-2xl font-medium mt-2 flex-1">
            Match Info
          </Text>
        </View>

        <View className="mt-8 bg-slate-800 p-2 rounded-lg pl-4 py-5 border-slate-700 border">
          <View className="flex-row justify-between items-center">
            <View className="NAME_SECTION gap-4">
              <Text className="text-textColor text-[20px] font-semibold">
                {actualMatch.player1}
              </Text>

              <Text className="text-textColor text-[20px] font-semibold">
                {actualMatch.player2}
              </Text>
            </View>
            <View className="SCORE_SECTION gap-5 flex-row pr-2">
              <View className="1 flex-col  gap-2">
                <Text className="text-slate-900 text-[20px] text-center font-bold p-1  px-2 bg-cyan-300 rounded-xl">
                  {actualMatch.player1_1s}
                </Text>
                <Text className="text-slate-900 text-[20px] text-center font-bold p-1 px-2 bg-cyan-300 rounded-xl">
                  {actualMatch.player2_1s}
                </Text>
              </View>
              <View className="2 flex-col gap-2">
                <Text className="text-slate-900 text-[20px] text-center font-bold p-1 px-2 bg-cyan-300 rounded-xl">
                  {actualMatch.player1_2s}
                </Text>
                <Text className="text-slate-900 text-[20px] text-center font-bold p-1 px-2 bg-cyan-300 rounded-xl">
                  {actualMatch.player2_2s}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="bg-slate-800 mt-5 p-3 rounded-lg">
          <Text className="text-blue-300 text-xl pl-3">Match Notes</Text>
          <View className="flex-row gap-3 pl-3 mt-3">
            <Text className="text-slate-400 text-lg">
              {actualMatch.matchNote}
            </Text>
          </View>
        </View>
        <Text className="text-blue-300 text-[16px] font-medium py-2 px-1 mt-4 ">
          Match ratings:
        </Text>
        <View className="bg-slate-800 mt-1 p-3 rounded-xl border-slate-700 border">
          <View className="p-2 gap-4">
            <View className="flex-row items-center">
              <Text className="text-slate-300 text-[17px] font-medium w-[140px]">
                Strategies
              </Text>
              <View className="ml-4">
                <Rating
                  size={13}
                  rating={actualMatch.strat}
                  disabled
                  scale={1}
                  spacing={11}
                  baseColor={"#C7C7CC"}
                  fillColor="gold"
                  touchColor="gold"
                />
              </View>
            </View>
            <View className="flex-row items-center ">
              <Text className="text-slate-300  text-[17px] font-medium w-[140px]">
                Techniques
              </Text>
              <View className="ml-4">
                <Rating
                  size={13}
                  rating={actualMatch.techni}
                  disabled
                  scale={1}
                  spacing={11}
                  baseColor={"#C7C7CC"}
                  fillColor="gold"
                  touchColor="gold"
                />
              </View>
            </View>
            <View className="flex-row items-center ">
              <Text className="text-slate-300 text-[17px] font-medium w-[140px]">
                Mental
              </Text>
              <View className="ml-4 ">
                <Rating
                  size={13}
                  rating={actualMatch.mental}
                  disabled
                  scale={1}
                  spacing={11}
                  baseColor={"#C7C7CC"}
                  fillColor="gold"
                  touchColor="gold"
                />
              </View>
            </View>
            <View className="flex-row items-center">
              <Text className="text-slate-300 text-[17px] font-medium w-[140px]">
                Physical
              </Text>
              <View className="ml-4">
                <Rating
                  size={13}
                  rating={actualMatch.physical}
                  disabled
                  scale={1}
                  spacing={11}
                  baseColor={"#C7C7CC"}
                  fillColor="gold"
                  touchColor="gold"
                />
              </View>
            </View>
          </View>
        </View>
        <View className="flex-row gap-4">
          {/* <TouchableOpacity
            onPress={() => {
              deleteMatchInfo(actualMatch.matchId);
              router.back();
            }}
          >
            <Text className="text-red-500 mt-5 text-[15px] font-medium ml-1">
              Delete
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
}
