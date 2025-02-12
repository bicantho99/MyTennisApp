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
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useWeeklyStore } from "../../../assets/useWeeklyStore";
export default function Home() {
  type Challenge = {
    day: number;
    text: string;
    completed: boolean;
  };
  const { challenges, loadChallenges } = useWeeklyStore();

  const scrollY = React.useRef(new Animated.Value(0)).current;
  const scrollViewRef = React.useRef<FlatList>(null);
  const ITEM_SIZE = 90;
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth * 0.8;
  useEffect(() => {
    loadChallenges();
  }, []);
  const [editToggle, setEditToggle] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-bgColor">
      <StatusBar style="light" />
      <View className="mx-6 mt-3">
        <View className="Header mb-5 flex-row justify-between">
          <Text className="text-white font-semibold text-[25px]">
            My Tennis App
          </Text>
        </View>

        <View className="box-view  bg-slate-800 pl-5  pr-4 pt-5  border-blue-800 rounded-xl gap-[5px]   border-[0.4px]   shadow-sm shadow-blue-400 pb-4">
          <View className="text-view gap-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-blue-300 font-semi text-[21px]">
                I'm Working On:
              </Text>
              <MaterialCommunityIcons
                name="arrow-up-down"
                size={20}
                color="gray"
              />
            </View>

            <View className="h-[90px] ">
              <Animated.FlatList
                ref={scrollViewRef} // Attach the FlatList reference
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                  { useNativeDriver: true }
                )}
                data={challenges}
                keyExtractor={(item) => String(item.text)}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 5 }}
                scrollEventThrottle={10}
                decelerationRate={0.2}
                getItemLayout={(data, index) => ({
                  length: ITEM_SIZE,
                  offset: ITEM_SIZE * index,
                  index,
                })}
                initialNumToRender={1}
                maxToRenderPerBatch={1}
                renderItem={({ item, index }) => {
                  const inputRange = [
                    -1,
                    0,
                    ITEM_SIZE * index,
                    ITEM_SIZE * (index + 2),
                  ];
                  const opacityRange = [
                    -1,
                    0,
                    ITEM_SIZE * index,
                    ITEM_SIZE * (index + 0.5),
                  ];

                  const scale = scrollY.interpolate({
                    inputRange,
                    outputRange: [1, 1, 1, 0],
                  });
                  const opacity = scrollY.interpolate({
                    inputRange: opacityRange,
                    outputRange: [1, 1, 1, 0],
                  });

                  return (
                    <Animated.View
                      style={{
                        transform: [{ scale }],
                        opacity,
                      }}
                    >
                      <View
                        className="bg-blue-400 rounded-xl gap-3 p-[15px] mt-[8.3px] "
                        style={{}}
                      >
                        <View className="flex-row justify-between ">
                          <Text className="text-[16px] font-semibold">
                            {item.text}
                          </Text>
                        </View>

                        <Text className="font-semibold opacity-[0.6px]">
                          {item.descr}
                        </Text>
                      </View>
                    </Animated.View>
                  );
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => router.push("/tabs/home/strategies")}
            >
              <Text className="text-center text-white font-semibold text-md bg-slate-700 rounded-lg p-5">
                SEE ALL
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="Header mt-5 flex-row justify-between mb-5">
          <Text className="text-textColor font-semibold text-[25px]">
            Explore Features
          </Text>
        </View>

        <View className="flex-wrap flex-row gap-4">
          <TouchableOpacity
            className="bg-yellow-100 rounded-md h-[90px]  flex-col gap-4 pl-3  pt-[12px] flex-1 "
            onPress={() => router.push("/tabs/journal")}
          >
            <Ionicons
              name="journal"
              size={30}
              color="rgba(0, 0, 0, 1)"
              style={{ opacity: 0.6 }}
            />
            <Text className="text-slate-800 font-bold text-[16px]">
              Journal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-teal-300 rounded-md h-[90px]  flex-col gap-4 pl-3 pt-[12px]  flex-1"
            onPress={() => router.push("/tabs/train")}
          >
            <Ionicons
              name="tennisball"
              size={30}
              color="rgba(0, 0, 0, 0.9)"
              style={{ opacity: 0.6 }}
            />
            <Text className="text-slate-800 font-bold text-[16px]">Train</Text>
          </TouchableOpacity>
        </View>

        <View className="Header mt-5 flex-row justify-between mb-4 ">
          <Text className="text-textColor font-semibold text-[25px]">
            Programs
          </Text>
        </View>

        <View className="gap-2 mb-2">
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/programOverview",
                params: { trainingId: 0 },
              })
            }
          >
            <View className="box-view   bg-slate-800  rounded-xl  border-slate-700  border-[0.4px] p-3 ">
              <View className="bg-blue-400 rounded-md gap-3 p-3 ">
                <View className="flex-row justify-between">
                  <Text className="text-lg font-semibold ">
                    Single Strategies
                  </Text>
                  <Text className="text-[14px] font-bold mt-[4px] text-slate-800">
                    Coach Cecile
                  </Text>
                </View>
                <Text className="text-[15px] font-medium text-gray-900">
                  Training focus on hitting tweener winner
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/programOverview",
                params: { trainingId: 1 },
              })
            }
          >
            <View className="box-view  bg-slate-800  border-slate-700  rounded-xl  border-[0.4px]  p-3">
              <View className="bg-blue-400 rounded-md gap-3 p-3 ">
                <View className="flex-row justify-between">
                  <Text className="text-lg font-semibold text-slate-900">
                    Double Strategies
                  </Text>
                  <Text className="text-[14px] font-bold mt-[4px] text-slate-900 ">
                    Coach Jakub
                  </Text>
                </View>

                <Text className="text-[15px] font-medium text-gray-900 ">
                  Training focus on hitting underarm serves
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
