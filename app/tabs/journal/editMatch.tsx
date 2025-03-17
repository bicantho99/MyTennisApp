import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useMatchStore } from "@/assets/matchdata/storage";
import { Rating } from "@kolking/react-native-rating";

export default function EditMatch() {
  type Match = {
    matchId: string | number;
    player1?: string;
    player2?: string;
    player1_1s?: string;
    player1_2s?: string;
    player1_3s?: string;
    player2_1s?: string;
    player2_2s?: string;
    player2_3s?: string;
    matchNote?: string;
    strat?: number;
    techni?: number;
    mental?: number;
    physical?: number;
  };

  const router = useRouter();
  const { editingMatchID } = useLocalSearchParams();
  const { matchInfos, updateMatchInfo } = useMatchStore();
  const [selected, setSelected] = useState<number>(0);
  const selectedMatch = matchInfos.find(
    (item: any) => item.matchId === editingMatchID
  );

  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player1_1s, setPlayer1_1s] = useState("");
  const [player1_2s, setPlayer1_2s] = useState("");
  const [player1_3s, setPlayer1_3s] = useState("");
  const [player2_1s, setPlayer2_1s] = useState("");
  const [player2_2s, setPlayer2_2s] = useState("");
  const [player2_3s, setPlayer2_3s] = useState("");
  const [matchNote, setMatchNote] = useState("");
  const [strat, setStrat] = useState(0);
  const [techni, setTechni] = useState(0);
  const [mental, setMental] = useState(0);
  const [physical, setPhysical] = useState(0);

  useEffect(() => {
    if (selectedMatch) {
      setPlayer1(selectedMatch.player1 || "");
      setPlayer2(selectedMatch.player2 || "");
      setPlayer1_1s(selectedMatch.player1_1s || "");
      setPlayer1_2s(selectedMatch.player1_2s || "");
      setPlayer1_3s(selectedMatch.player1_3s || "");
      setPlayer2_1s(selectedMatch.player2_1s || "");
      setPlayer2_2s(selectedMatch.player2_2s || "");
      setPlayer2_3s(selectedMatch.player2_3s || "");
      setMatchNote(selectedMatch.matchNote || "");
      setStrat(selectedMatch.strat || 0);
      setTechni(selectedMatch.techni || 0);
      setMental(selectedMatch.mental || 0);
      setPhysical(selectedMatch.physical || 0);
    }
  }, [selectedMatch]);

  const handleEditMatch = () => {
    if (!selectedMatch) return;

    updateMatchInfo(selectedMatch.matchId, {
      player1,
      player2,
      player1_1s,
      player1_2s,
      player1_3s,
      player2_1s,
      player2_2s,
      player2_3s,
      matchNote,
      strat,
      techni,
      mental,
      physical,
    });
    router.back();
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }} className="bg-bgColor">
      <View className="mx-6 gap-5 pb-10 pt-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-textColor text-3xl font-bold mt-5">
            Edit Match
          </Text>
          <TouchableOpacity onPress={handleEditMatch}>
            <Text className="mt-5 text-[15px] font-medium text-green-300">
              Save
            </Text>
          </TouchableOpacity>
        </View>

        <SegmentedControl
          values={["Players & Score", "Notes", "Ratings"]}
          selectedIndex={selected}
          onChange={(event) => {
            setSelected(event.nativeEvent.selectedSegmentIndex);
          }}
          style={{ marginBottom: 20 }}
        />

        {selected === 0 && (
          <PlayersScore
            player1={player1}
            setPlayer1={setPlayer1}
            player2={player2}
            setPlayer2={setPlayer2}
            player1_1s={player1_1s}
            setPlayer1_1s={setPlayer1_1s}
            player1_2s={player1_2s}
            setPlayer1_2s={setPlayer1_2s}
            player1_3s={player1_3s}
            setPlayer1_3s={setPlayer1_3s}
            player2_1s={player2_1s}
            setPlayer2_1s={setPlayer2_1s}
            player2_2s={player2_2s}
            setPlayer2_2s={setPlayer2_2s}
            player2_3s={player2_3s}
            setPlayer2_3s={setPlayer2_3s}
          />
        )}
        {selected === 1 && (
          <NotesSection matchNote={matchNote} setMatchNote={setMatchNote} />
        )}
        {selected === 2 && (
          <RatingsSection
            strat={strat}
            setStrat={setStrat}
            techni={techni}
            setTechni={setTechni}
            mental={mental}
            setMental={setMental}
            physical={physical}
            setPhysical={setPhysical}
          />
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}

function PlayersScore({
  player1,
  setPlayer1,
  player2,
  setPlayer2,
  player1_1s,
  setPlayer1_1s,
  player1_2s,
  setPlayer1_2s,
  player1_3s,
  setPlayer1_3s,
  player2_1s,
  setPlayer2_1s,
  player2_2s,
  setPlayer2_2s,
  player2_3s,
  setPlayer2_3s,
}: any) {
  return (
    <View className="section-view gap-3 ">
      <View className="flex-row justify-between">
        <TextInput
          className="bg-gray-800  px-4 mb-1 rounded-lg text-white  w-[55%]"
          placeholder="Player's Name"
          placeholderTextColor={"gray"}
          value={player1}
          onChangeText={setPlayer1}
        />
        <View className="flex-row gap-2">
          <TextInput
            className="bg-gray-800 py-5 px-4 mb-1 rounded-lg text-white w-[40px] "
            placeholder="0"
            placeholderTextColor={"gray"}
            value={player1_1s}
            onChangeText={setPlayer1_1s}
          />
          <TextInput
            className="bg-gray-800 py-5 px-4 mb-1 rounded-lg text-white w-[40px] "
            placeholder="0"
            placeholderTextColor={"gray"}
            value={player1_2s}
            onChangeText={setPlayer1_2s}
          />
          <TextInput
            className="bg-gray-800 py-5 px-4 mb-1 rounded-lg text-white w-[40px] "
            placeholder="0"
            placeholderTextColor={"gray"}
            value={player1_3s}
            onChangeText={setPlayer1_3s}
          />
        </View>
      </View>
      <View className="flex-row justify-between">
        <TextInput
          className="bg-gray-800 py-5 px-4 mb-1 rounded-lg text-white  w-[55%]"
          placeholder="Opponent's Name "
          placeholderTextColor={"gray"}
          value={player2}
          onChangeText={setPlayer2}
        />
        <View className="flex-row gap-2">
          <TextInput
            className="bg-gray-800 py-5 px-4 mb-1 rounded-lg text-white w-[40px] "
            placeholder="0"
            placeholderTextColor={"gray"}
            value={player2_1s}
            onChangeText={setPlayer2_1s}
          />
          <TextInput
            className="bg-gray-800 py-5 px-4 mb-1 rounded-lg text-white w-[40px] "
            placeholder="0"
            placeholderTextColor={"gray"}
            value={player2_2s}
            onChangeText={setPlayer2_2s}
          />
          <TextInput
            className="bg-gray-800 py-5 px-4 mb-1 rounded-lg text-white w-[40px] "
            placeholder="0"
            placeholderTextColor={"gray"}
            value={player2_3s}
            onChangeText={setPlayer2_3s}
          />
        </View>
      </View>
    </View>
  );
}

function NotesSection({ matchNote, setMatchNote }: any) {
  return (
    <View className="section-view gap-3">
      <TextInput
        className="bg-gray-800 px-3 pb-10 pt-5 rounded-lg text-white"
        placeholder="Match Notes"
        placeholderTextColor={"gray"}
        onChangeText={setMatchNote}
        value={matchNote}
        multiline
      />
    </View>
  );
}

function RatingsSection({
  strat,
  setStrat,
  techni,
  setTechni,
  mental,
  setMental,
  physical,
  setPhysical,
}: any) {
  return (
    <View className="section-view gap-3">
      <View className="flex-row items-center">
        <Text className="text-slate-300 text-[17px] font-medium w-[140px]">
          Strategies
        </Text>
        <Rating
          size={13}
          rating={strat}
          onChange={setStrat}
          scale={1}
          spacing={11}
          baseColor={"#C7C7CC"}
          fillColor="gold"
          touchColor="gold"
        />
      </View>
      <View className="flex-row items-center">
        <Text className="text-slate-300 text-[17px] font-medium w-[140px]">
          Techniques
        </Text>
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
      <View className="flex-row items-center">
        <Text className="text-slate-300 text-[17px] font-medium w-[140px]">
          Mental
        </Text>
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
      <View className="flex-row items-center">
        <Text className="text-slate-300 text-[17px] font-medium w-[140px]">
          Physical
        </Text>
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
  );
}
