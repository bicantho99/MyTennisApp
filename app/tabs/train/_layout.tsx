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
      <Stack.Screen name="examplePage" />

      <Stack.Screen name="trainingPage" />
      <Stack.Screen
        name="addtraining"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="EditPage"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
