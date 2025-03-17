import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="bigbrain"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="defend"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="attack"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="judges"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
