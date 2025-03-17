import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" />

      <Stack.Screen name="matchExample" />
      <Stack.Screen name="matchpage" />
      <Stack.Screen
        name="addmatch"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="addNotes"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="editMatch"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
