import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
  Animated,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  ImageBackground,
  Button,
} from "react-native";
import Svg, { Circle, Rect } from "react-native-svg";
import * as Progress from "react-native-progress";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useWeeklyStore } from "../../../assets/useWeeklyStore";
import { FontAwesome6 } from "@expo/vector-icons";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDailyStore } from "../../../assets/useDailyStore";

const STREAK_KEY = "streakData";
const getTodayDateString = () => new Date().toISOString().split("T")[0];

export default function Home() {
  const getCurrentWeek = () => {
    const today = new Date();

    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    const weekArray = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      return {
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        number: date.getDate(),
      };
    });

    return weekArray;
  };
  const [weekArray, setWeekArray] = useState<any>([]);
  const [clickCount, setClickCount] = useState<number>(0);
  const [randomChallenges, setRandomChallenges] = useState<string[]>([]);
  const progress = clickCount / 7;
  const { dailyChallenges } = useDailyStore();
  useEffect(() => {
    // AsyncStorage.clear();
    const loadStreak = async () => {
      const savedCount = await AsyncStorage.getItem("progress");
      if (savedCount !== null) {
        setClickCount(JSON.parse(savedCount));
      }

      const data = await AsyncStorage.getItem(STREAK_KEY);
      if (data) {
        const { streak, lastCompleted } = JSON.parse(data);
        const today = getTodayDateString();

        if (lastCompleted === today) {
          setIsCompleted(true);
          setDayStreak(streak);
        } else {
          const yesterday = new Date(lastCompleted);
          yesterday.setDate(yesterday.getDate() + 1);

          if (today === yesterday.toISOString().split("T")[0]) {
            setDayStreak(streak);
          } else {
            setDayStreak(0);
          }
        }
      }
    };

    const loadChallenges = async () => {
      const today = getTodayDateString();
      const savedChallenges = await AsyncStorage.getItem("dailyChallenges");

      if (savedChallenges) {
        const { date, challenges } = JSON.parse(savedChallenges);
        if (date === today) {
          setRandomChallenges(challenges);
          return;
        }
      }

      // Generate new challenges
      const newChallenges = [
        dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)],
        dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)],
      ];

      await AsyncStorage.setItem(
        "dailyChallenges",
        JSON.stringify({ date: today, challenges: newChallenges })
      );

      setRandomChallenges(newChallenges);
    };

    setWeekArray(getCurrentWeek);
    loadStreak();
    loadChallenges();
  }, []);

  type Challenge = {
    day: any;
    text: string;
    completed: boolean;
  };
  const { challenges, loadChallenges } = useWeeklyStore();

  const scrollY = React.useRef(new Animated.Value(0)).current;
  const scrollViewRef = React.useRef<FlatList>(null);
  const ITEM_SIZE = 90;
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth * 0.8;
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [editToggle, setEditToggle] = useState(false);
  const [streak, setStreak] = useState(0);
  const [lastPressed, setLastPressed] = useState("");
  const today = new Date().toDateString();

  const [dayStreak, setDayStreak] = useState<number>(0);

  const challengeComplete = async () => {
    setIsCompleted(true);

    setDayStreak((prev) => prev + 1);

    await AsyncStorage.setItem(
      STREAK_KEY,
      JSON.stringify({
        streak: dayStreak + 1,
        lastCompleted: getTodayDateString(),
      })
    );
    setClickCount((prevCount) => {
      const newCount = prevCount >= 7 ? 1 : prevCount + 1;

      AsyncStorage.setItem("progress", JSON.stringify(newCount)); // Save updated count

      return newCount;
    });
  };
  const width = screenWidth;

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-bgColor">
      <StatusBar style="light" />
      <View className="mx-6 ">
        <View className="gap-3  rounded-lg ">
          <View className="flex-row items-center gap-[20px] rounded-xl h-[80px] justify-between ">
            <View className="flex-row gap-6">
              <FontAwesome6 name="fire" size={45} color="orange" />
              <View className="flex-col">
                <Text
                  className="text-white text-[20px]"
                  style={{ translateX: 10 }}
                >
                  Challenge Streak
                </Text>
                <Text className="text-white text-[20px]">{dayStreak} Days</Text>
              </View>
            </View>
            <TouchableOpacity
              className="pr-2"
              onPress={() => router.push("/tabs/home/judges")}
            >
              <LottieView
                style={{
                  width: 60,
                  height: 60,
                }}
                source={require("@/assets/images/test1.json")}
                autoPlay
                loop
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row gap-2 ">
            {weekArray.map((item: any, index: number) => {
              const today = new Date().getDate();
              return (
                <View
                  key={index}
                  style={{ width: screenWidth / 7.8 }}
                  className={` py-4 rounded-xl gap-2  ${
                    item.number == today ? "bg-blue-500" : "bg-slate-700"
                  }`} // Apply different background color for today
                >
                  <Text className="text-center text-slate-200 font-semibold">
                    {item.day}
                  </Text>
                  <Text
                    className={`${
                      item.number == today ? "text-slate-200" : "text-slate-400"
                    } text-center  font-medium`}
                  >
                    {item.number}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View className="bg-slate-800 rounded-lg h-[170px] mt-5 flex-row px-3 py-2">
          <View className="flex-[0.6] rounded-lg pl-2 mt-2 ">
            <Text className="font-bold text-[20px] text-green-200">
              Daily Challenge:
            </Text>
            {randomChallenges.map((item: any, index: any) => {
              return (
                <View key={index} className="gap-2">
                  <Text className="font-medium text-white w-[90%] tracking-tight mt-4 text-[12px]">
                    - {item.text}
                  </Text>
                </View>
              );
            })}

            {isCompleted ? (
              <TouchableOpacity
                onPress={() =>
                  alert("You already completed today's challenge!")
                }
                className="mt-5 rounded-lg  ml-1 flex-row opacity-[0.6] items-center bg-teal-300 w-[30%]"
              >
                <Text className="text-center font-semibold text-slate-800  p-2 rounded-lg">
                  Completed
                </Text>
                <Entypo name="check" size={19} color="green" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={challengeComplete}
                className="mt-5  rounded-lg  ml-1 flex-row  items-center bg-teal-300 w-[20%]"
              >
                <Text className="text-center font-semibold text-slate-800  p-2 rounded-lg">
                  Complete
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View className=" flex flex-[0.4] rounded-lg  justify-between ">
            <View className="items-center flex mt-4 ">
              <Progress.Circle
                size={110}
                indeterminate={false}
                progress={progress}
                color={"cyan"}
                borderWidth={0}
                showsText={true}
                thickness={10}
                unfilledColor="#334155"
              />
            </View>
          </View>
        </View>

        <View className="Header mt-3 flex-row justify-between mb-3">
          <Text className="text-textColor font-semibold text-[23px]">
            Strategies:
          </Text>
        </View>

        <View className="flex-wrap flex-row gap-4 ">
          <TouchableOpacity
            className="bg-slate-100 rounded-md h-[115px]  flex-col gap-4 pl-3  pt-[12px] flex-1  "
            onPress={() => router.push("/tabs/home/bigbrain")}
          >
            <FontAwesome6 name="brain" size={24} color="black" />
            <Text className="text-slate-800 font-bold text-[16px]  mt-3 opacity-[0.9]">
              Big Brain
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-green-200 rounded-md h-[115px]  flex-col gap-4 pl-3 pt-[12px]  flex-1"
            onPress={() => router.push("/tabs/home/attack")}
          >
            <MaterialCommunityIcons
              name="sword-cross"
              size={24}
              color="black"
            />
            <Text className="text-slate-800 font-bold text-[16px]  mt-3 opacity-[0.9]">
              Attack
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-blue-300 rounded-md h-[115px]  flex-col gap-4 pl-3 pt-[12px]  flex-1"
            onPress={() => router.push("/tabs/home/defend")}
          >
            <Fontisto name="shield" size={24} color="black" />
            <Text className="text-slate-800 font-bold text-[16px]  mt-3 opacity-[0.9]">
              Defend
            </Text>
          </TouchableOpacity>
        </View>

        <View className="Header mt-4 flex-row justify-between mb-3 ">
          <Text className="text-textColor font-semibold text-[25px]">
            Programs:
          </Text>
        </View>

        <View className="gap-2 mb-2 flex-row  h-[160px] ">
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/programOverview",
                params: { trainingId: 0 },
              })
            }
            style={{ zIndex: 1 }}
            className="box-view   bg-slate-800  rounded-xl  border-slate-700  border-[0.4px] p-3 h-[150px]  w-1/2"
          >
            <View className="flex flex-col gap-2 pl-1 pt-1">
              <Text className="text-[23px] font-semibold text-slate-200 tracking-tighter">
                Single
              </Text>
              <Text className="text-[23px] font-semibold text-textColor tracking-tighter">
                Strategies
              </Text>
            </View>
            <TouchableOpacity
              className="mt-6"
              onPress={() =>
                router.push({
                  pathname: "/programOverview",
                  params: { trainingId: 0 },
                })
              }
            >
              <Text className="text-center font-bold bg-teal-200 w-[90px] px-2 py-2 rounded-lg">
                Explore
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/programOverview",
                params: { trainingId: 1 },
              })
            }
            className="box-view  bg-slate-800  border-slate-700  rounded-xl  border-[0.4px]  p-3  h-[150px] w-1/2"
          >
            <View className="flex flex-col gap-2 pl-1 pt-1">
              <Text className="text-[23px]  font-semibold text-slate-200 tracking-tighter">
                Double
              </Text>
              <Text className="text-[23px]  font-semibold text-textColor tracking-tighter">
                Strategies
              </Text>
            </View>
            <TouchableOpacity
              className="mt-6"
              onPress={() =>
                router.push({
                  pathname: "/programOverview",
                  params: { trainingId: 1 },
                })
              }
            >
              <Text className="text-center font-bold bg-teal-200 w-[90px] px-2 py-2 rounded-lg">
                Explore
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
