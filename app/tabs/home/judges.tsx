import { View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import React, { useState } from "react";

export default function judges() {
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
  const [selected2, setSelected2] = useState<string>("");
  const [mode, setMode] = useState<number | null>(null);
  function magicKhanhBall() {}
  return (
    <View className="bg-bgColor flex-1">
      <View className="flex justify-center items-center mt-5 px-2">
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
    </View>
  );
}
