import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

import AntDesign from "@expo/vector-icons/AntDesign";
import { useTrainingStore } from "@/assets/trainingsData/data";
export default function program() {
  const { loadTrainings, trainingData, deleteTraining } = useTrainingStore();

  useEffect(() => {
    loadTrainings();
  }, []);
  return (
    <View className="flex-1 bg-bgColor">
      <ScrollView showsVerticalScrollIndicator={false} className="mt-[50px]">
        <StatusBar style="light" />
        <View className="mx-6 my-2 ">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-white  text-[25px]  font-semibold mt-3  mb-1">
              Trainings
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/tabs/train/addtraining");
              }}
            >
              <AntDesign
                name="pluscircle"
                size={22}
                color="white"
                className=""
              />
            </TouchableOpacity>
          </View>
          <View className="gap-5">
            {trainingData.map((item: any, index: any) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    router.push({
                      pathname: "/tabs/train/trainingPage",
                      params: { trainingIDX: item.id },
                    });
                  }}
                >
                  <View className="bg-slate-800 p-4 gap-3 rounded-xl border-blue-300 border-[0.4px] shadow-sm shadow-blue-300">
                    <View className="flex-row justify-between items-center mb-1">
                      <Text className="text-blue-100 font-medium rounded-lg ">
                        {item.time}
                      </Text>
                      <Text className="text-blue-400 font-bold rounded-lg">
                        {item.datedate}
                      </Text>
                    </View>
                    <Text className="text-blue-300 font-bold text-[20px]">
                      {item.title}
                    </Text>
                    <Text className="text-white text-md">
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/tabs/train/examplePage",
                });
              }}
            >
              <View className="bg-slate-800 p-4 gap-3 rounded-xl border-blue-300 border-[0.4px] shadow-sm shadow-blue-300">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-blue-100 font-medium rounded-lg ">
                    4:00 PM
                  </Text>
                  <Text className="text-blue-400 font-bold rounded-lg">
                    Wednesday, July 12
                  </Text>
                  {/* <AntDesign name="right" size={18} color="gray" /> */}
                </View>
                <Text className="text-blue-300 font-bold text-[20px]">
                  Baseline Pattern
                </Text>
                <Text className="text-slate-200 text-md">
                  This training focus on baseline patterns
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/tabs/train/addtraining");
              }}
            >
              <View className="box-view border-dotted border border-teal-300  bg-teal-900/20  rounded-xl gap-[15px]  h-[85px] mb-4   items-center justify-center">
                <Text className="text-slate-200 text-[17px] font-medium">
                  Create Your Own Trainings
                </Text>
                <AntDesign name="addfile" size={22} color="white" />
              </View>
            </TouchableOpacity>
          </View>

          <View className="mt-8 gap-2"></View>
        </View>
      </ScrollView>
    </View>
  );
}












// Define the type for name objects

// Define the type for person objects

// import { useRouter } from "expo-router";
// import { usePeopleStore } from "@/assets/editStore";

// const EditPersonComponent: React.FC = () => {
//   const router = useRouter();
//   const { people, setSelectedPerson } = usePeopleStore();

//   return (
//     <SafeAreaView className="flex-1 justify-center items-center">
//       <Text>People List</Text>
//       <View>
//         {people.map((person) => (
//           <View key={person.id}>
//             <Text>
//               ID: {person.id} - {person.name}, Age: {person.age}
//             </Text>
//             <Button
//               title="Edit"
//               onPress={() => {
//                 setSelectedPerson(person);
//                 router.push("/tabs/train/EditPage");
//               }}
//             />
//           </View>
//         ))}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default EditPersonComponent;
