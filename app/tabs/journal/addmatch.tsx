import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
  FlatList,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMatchStore } from "@/assets/matchdata/storage";
import { Rating } from "@kolking/react-native-rating";
import uuid from "react-native-uuid";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function Adding() {
  const [rating, setRating] = useState(4);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player1_1s, setPlayer1_1s] = useState("");
  const [player1_2s, setPlayer1_2s] = useState("");
  const [player1_3s, setPlayer1_3s] = useState("");
  const matchId = uuid.v4();
  const [player2_1s, setPlayer2_1s] = useState("");
  const [player2_2s, setPlayer2_2s] = useState("");
  const [player2_3s, setPlayer2_3s] = useState("");
  const [matchNote, setmatchNote] = useState("");
  const [date, setDate] = useState("");

  const { matchInfos, addMatchInfo, loadMatchInfos, deleteMatchInfo } =
    useMatchStore();

  const [techni, setTechni] = useState(0);
  const [mental, setMental] = useState(0);
  const [strate, setStrate] = useState(0);
  const [physical, setPhysical] = useState(0);

  const handleAddMatchInfo = () => {
    if (!player1 && !player2) {
      return;
    }
    const newMatchInfo = {
      matchId,
      player1,
      player2,
      player1_1s,
      player1_2s,
      player1_3s,
      player2_1s,
      player2_2s,
      player2_3s,
      matchNote,
      techni,
      mental,
      strate,
      physical,
    };

    addMatchInfo(newMatchInfo);
    router.back();
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }} className="bg-bgColor">
      <SafeAreaView>
        <View className="mx-6 gap-5 pb-10 ">
          <View className="flex-row justify-between items-center">
            <Text className="text-textColor text-3xl font-bold mt-5">
              New Match
            </Text>
          </View>
          <View className="section-view gap-3">
            <View className="flex-row justify-between">
              <TextInput
                className="bg-slate- p-4 py-5 mb-1 rounded-xl   text-white   border-blue-300 border-[0.9px] shadow-sm shadow-slate-700 w-[55%]"
                placeholder="Player's Name"
                placeholderTextColor={"gray"}
                value={player1}
                onChangeText={setPlayer1}
              />
              <View className="flex-row gap-2">
                <TextInput
                  className="bg-gray- w-[39px] rounded-lg pl-4 text-xl text-white border-blue-300 border-[0.9px]"
                  placeholder="0"
                  placeholderTextColor={"gray"}
                  value={player1_1s}
                  onChangeText={setPlayer1_1s}
                />
                <TextInput
                  className="bg-gray- w-[39px] rounded-lg pl-4 text-xl text-white border-blue-300 border-[0.9px]"
                  placeholder="0"
                  placeholderTextColor={"gray"}
                  value={player1_2s}
                  onChangeText={setPlayer1_2s}
                />
                <TextInput
                  className="bg-gray- w-[39px] rounded-lg pl-4 text-xl text-white border-blue-300 border-[0.9px]"
                  placeholder="0"
                  placeholderTextColor={"gray"}
                  value={player1_3s}
                  onChangeText={setPlayer1_3s}
                />
              </View>
            </View>
            <View className="flex-row justify-between">
              <TextInput
                className=" p-4 py-5 mb-1 rounded-xl   text-white   border-blue-300 border-[0.9px] shadow-sm shadow-slate-700 w-[55%]"
                placeholder="Opponent's Name "
                placeholderTextColor={"gray"}
                value={player2}
                onChangeText={setPlayer2}
              />
              <View className="flex-row gap-2">
                <TextInput
                  className=" w-[39px] rounded-lg pl-4 text-xl text-white  border-blue-300 border-[0.9px]"
                  placeholder="0"
                  placeholderTextColor={"gray"}
                  value={player2_1s}
                  onChangeText={setPlayer2_1s}
                />
                <TextInput
                  className=" w-[39px] rounded-lg pl-4 text-xl text-white border-blue-300 border-[0.9px]"
                  placeholder="0"
                  placeholderTextColor={"gray"}
                  value={player2_2s}
                  onChangeText={setPlayer2_2s}
                />
                <TextInput
                  className=" w-[39px] rounded-lg pl-4 text-xl text-white border-blue-300 border-[0.9px]"
                  placeholder="0"
                  placeholderTextColor={"gray"}
                  value={player2_3s}
                  onChangeText={setPlayer2_3s}
                />
              </View>
            </View>

            <TextInput
              className="bg-gray-800 px-3 pb-10 pt-4 rounded-lg  border border-slate-400 text-white  shadow-sm shadow-slate-700 mt-2"
              placeholder="Strategies used, How did opponent play? "
              placeholderTextColor={"gray"}
              // multiline
              value={matchNote}
              onChangeText={setmatchNote}
            />
          </View>

          <View className="bg-slate-800 mt-1 p-3 rounded-xl border-slate-400 border">
            <View className="p-2 gap-4">
              <View className="flex-row items-center">
                <Text className="text-blue-300 text-[16px] font-medium w-[140px]">
                  Strategies
                </Text>
                <View className="ml-4">
                  <Rating
                    size={13}
                    rating={strate}
                    onChange={setStrate}
                    scale={1}
                    spacing={11}
                    baseColor={"#C7C7CC"}
                    fillColor="gold"
                    touchColor="gold"
                  />
                </View>
              </View>
              <View className="flex-row items-center ">
                <Text className="text-blue-300  text-[16px] font-medium w-[140px]">
                  Physical
                </Text>
                <View className="ml-4">
                  <Rating
                    size={13}
                    rating={physical}
                    onChange={setPhysical}
                    scale={1}
                    spacing={11}
                    baseColor={"#C7C7CC"}
                    fillColor="gold"
                    touchColor="gold"
                  />
                </View>
              </View>
              <View className="flex-row items-center ">
                <Text className="text-blue-300 text-[16px] font-medium w-[140px]">
                  Mental
                </Text>
                <View className="ml-4 ">
                  <Rating
                    size={13}
                    rating={mental}
                    onChange={setMental}
                    scale={1}
                    spacing={11}
                    baseColor={"#C7C7CC"}
                    fillColor="gold"
                    touchColor="gold"
                  />
                </View>
              </View>
              <View className="flex-row items-center">
                <Text className="text-blue-300 text-[16px] font-medium w-[140px]">
                  Techniques
                </Text>
                <View className="ml-4">
                  <Rating
                    size={13}
                    rating={techni}
                    onChange={setTechni}
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

          <View className="section-view gap-3 items-center ">
            <TouchableOpacity
              onPress={() => {
                // handleSaveRating();
                handleAddMatchInfo();
              }}
            >
              <Text className="mt-5  text-green-300 text-center text-[18px] bg-slate-800 p-5 rounded-xl font-semibold">
                Add Match
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
