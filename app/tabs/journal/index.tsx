import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useMatchStore } from "@/assets/matchdata/storage";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
export default function Logs() {
  const categories = ["Matches", "Khanh"];

  const [selected, setSelected] = useState(0);
  const [toggle, setToggle] = useState(true);
  const { matchInfos } = useMatchStore();
  const { loadMatchInfos } = useMatchStore();
  const handlePress = (index: any) => {
    setSelected(index);
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    loadMatchInfos();
  }, []);
  const [selected2, setSelected2] = useState<string>("");
  const [mode, setMode] = useState<number | null>(null);

  const options = ["Mixed Dub", "Single", "Double"];
  const [judgement, setJudgement] = useState("");
  const [tactic, setTactic] = useState("");
  const tactics = [
    "Just Relax....Alex's favorite",
    "just raw dog it",
    "hog as many balls as you can",
    "just keep the ball inside the court and over the net",
    "Be like water my friend",
    "Try to annoy your opponent",
  ];
  const judges = [
    "Jk…I don’t judge",
    "good practice, but you need more tweener next time",
    "You need more underarm serve next time",
    "You definitely need to work on your attitude",
  ];
  function randomJudges() {
    const randomJudgement = judges[Math.floor(Math.random() * judges.length)];
    setJudgement(randomJudgement);
  }
  function randomTactic() {
    const randomTactic = tactics[Math.floor(Math.random() * tactics.length)];
    setTactic(randomTactic);
  }

  const [answer2, setAnswer2] = useState("");
  const switchComponent = () => {
    switch (selected) {
      case 1:
        return (
          <View className="flex justify-center items-center">
            <Text className="text-blue-300 text-[19px]  font-medium text-center">
              Khanh judges your practice/match
            </Text>

            <View className="p-4  rounded-xl gap-5  flex-col w-full ">
              <TextInput
                placeholder="How Many Tweener did you hit?"
                className="bg-slate-800 p-5 rounded-xl text-white"
              />
              <TextInput
                placeholder="How Many Underarm serve did you hit?"
                className="bg-slate-800 p-5 rounded-xl text-white "
              />
              <TextInput
                placeholder="Did you try to annoy your opponent?"
                className="bg-slate-800 p-5 rounded-xl text-white "
              />
              <TouchableOpacity className="" onPress={() => randomJudges()}>
                <Text className="bg-slate-800 text-center text-blue-300 p-3 rounded-xl text-xl">
                  Find Out
                </Text>
              </TouchableOpacity>
            </View>
            <Text className="text-white">{judgement}</Text>
            <View className="flex-col items-center mt-[100px]">
              <Text className="text-blue-300 text-[15px] font-medium mb-4">
                Ask Khanh emergency tactic, you are playing:
              </Text>
              <View className="flex-row gap-2">
                {options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelected2(option)}
                  >
                    <Text
                      className={`text-blue-300  p-3 rounded-xl ${
                        selected2 === option ? "bg-blue-500" : "bg-slate-800"
                      }`}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={() => randomTactic()}>
                  <Text className="bg-blue-800 p-3 rounded-xl text-gray-300 font-bold">
                    Ask
                  </Text>
                </TouchableOpacity>
              </View>
              <Text className="text-white mt-5">{tactic}</Text>
            </View>
          </View>
        );

      default:
        return (
          <View>
            {!matchInfos || matchInfos.length === 0 ? (
              <TouchableOpacity
                // key={item.matchId}
                onPress={() => {
                  router.push("/tabs/journal/matchExample");
                }}
              >
                <View className="bg-slate-800 pl-5 pr-3 p-4 border-blue-800 border-dash rounded-xl gap-[9px] border-[0.4px]  mb-4 shadow-sm shadow-slate-300 ">
                  <View>
                    <View className="flex-row justify-between items-center">
                      <View className="NAME_SECTION gap-4">
                        <Text className="text-textColor text-[19px] font-semibold">
                          Khanh Nguyen
                        </Text>
                        <Text className="text-textColor text-[19px] font-semibold">
                          Jakub Novak
                        </Text>
                      </View>
                      <View className="SCORE_SECTION gap-4 flex-row pr-2">
                        <View className="1 flex-col gap-2">
                          <Text className="text-slate-900 text-[21px] text-center font-bold bg-sky-400 p-1 px-2 rounded-xl">
                            6
                          </Text>
                          <Text className="text-slate-900 text-[21px] text-center font-bold bg-sky-400 p-1 px-2 rounded-xl">
                            4
                          </Text>
                        </View>
                        <View className="2 flex-col gap-2">
                          <Text className="text-slate-900 text-[21px] text-center font-bold bg-sky-400 p-1 px-2 rounded-xl">
                            6
                          </Text>
                          <Text className="text-slate-900 text-[21px] text-center font-bold bg-sky-400 p-1 px-2 rounded-xl">
                            4
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View className="gap-2 mt-2">
                    <View className="flex-row justify-between">
                      <Text className="text-slate-400 text-[14px]">
                        Match notes:
                      </Text>
                      <Text className="text-slate-400 text-[13px] pr-3">
                        02/19
                      </Text>
                    </View>
                    <Text className="text-slate-300 text-[14px]">
                      I hit an insane no-look tweener-winner....
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              matchInfos.map((item: any, index: any) => (
                <TouchableOpacity
                  key={item.matchId}
                  onPress={() => {
                    router.push({
                      pathname: "/tabs/journal/matchpage",
                      params: { matchId: item.matchId },
                    });
                  }}
                >
                  <View className="bg-slate-800 pl-5 pr-3 p-4 border-blue-800 border-dash rounded-xl gap-[9px] border-[0.4px] mb-4 shadow-sm shadow-slate-300">
                    <View>
                      <View className="flex-row justify-between items-center">
                        <View className="NAME_SECTION gap-4">
                          <Text className="text-textColor text-[19px] font-bold">
                            {item.player1}
                          </Text>
                          <Text className="text-textColor text-[19px] font-bold">
                            {item.player2}
                          </Text>
                        </View>
                        <View className="SCORE_SECTION gap-4 flex-row pr-2">
                          {!item.player1_1s && !item.player2_1s ? null : (
                            <View className="3 flex-col gap-2">
                              <Text className="text-slate-900 text-[21px] text-center font-bold bg-sky-400 p-1 px-2 rounded-xl">
                                {item.player1_1s}
                              </Text>
                              <Text className="text-slate-900 text-[21px] text-center font-bold bg-sky-400 p-1 px-2 rounded-xl">
                                {item.player2_1s}
                              </Text>
                            </View>
                          )}

                          {!item.player1_2s && !item.player2_2s ? null : (
                            <View className="3 flex-col gap-2">
                              <Text className="text-slate-900 text-[21px] text-center font-bold bg-sky-400 p-1 px-2 rounded-xl">
                                {item.player1_2s}
                              </Text>
                              <Text className="text-slate-900 text-[21px] text-center font-bold bg-sky-400 p-1 px-2 rounded-xl">
                                {item.player2_2s}
                              </Text>
                            </View>
                          )}

                          {!item.player1_3s && !item.player2_3s ? null : (
                            <View className="3 flex-col gap-2">
                              <Text className="text-slate-900 text-[21px] text-center font-bold bg-sky-400 p-1 px-2 rounded-xl">
                                {item.player1_3s}
                              </Text>
                              <Text className="text-slate-900 text-[21px] text-center font-bold bg-sky-400 p-1 px-2 rounded-xl">
                                {item.player2_3s}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>

                    <View className="gap-2 mt-1">
                      <Text className="text-slate-400 text-[14px]">
                        Match notes:
                      </Text>
                      <Text className="text-slate-300 text-[14px]">
                        {item.matchNote}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        );
    }
  };

  return (
    <View className="bg-bgColor flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className="mt-[50px]">
        <View className="mx-6 ">
          <View className="flex-row justify-between items-center">
            <Text className="text-white text-[25px] font-semibold mt-4">
              Journal
            </Text>
            {!toggle ? null : (
              <TouchableOpacity
                onPress={() => router.push("/tabs/journal/addmatch")}
              >
                <AntDesign
                  name="pluscircle"
                  size={22}
                  color="white"
                  className="mt-6"
                />
              </TouchableOpacity>
            )}
          </View>

          <View className="flex-row justify-evenly items-center mt-5  ">
            {categories.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    handlePress(index);
                  }}
                  key={index}
                  className={`${
                    selected === index
                      ? "border-2 border-teal-600 "
                      : "text-white "
                  }  py-3 items-center rounded-lg flex-1 justify-center`}
                >
                  <Text
                    className={`${
                      selected === index
                        ? "text-teal-300 text-lg font-bold"
                        : "text-slate-300 text-lg"
                    }   text-center`}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View className="mt-9 gap-2">{switchComponent()}</View>
        </View>
      </ScrollView>
    </View>
  );
}
