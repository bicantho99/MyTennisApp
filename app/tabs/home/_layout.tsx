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
        name="strategies"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
