import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import '../global.css';

export default function RootLayout() {
  return <SafeAreaProvider>
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#000000" },
        animation: "fade",
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="retrieve" />
      <Stack.Screen name="store" />
      <Stack.Screen name="shortner" />
    </Stack>
  </SafeAreaProvider>
}

