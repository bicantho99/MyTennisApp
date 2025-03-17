import { View, Text, ScrollView } from "react-native";
import React from "react";

export default function index() {
  return (
    <View className="bg-bgColor flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className="mt-[50px]">
        <View className="mx-6">
          <Text className="text-xl font-bold text-textColor">
            GroundStrokes
          </Text>
          
        </View>
      </ScrollView>
    </View>
  );
}
