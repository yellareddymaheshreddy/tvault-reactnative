import { Stack } from "expo-router";
import '../global.css'
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return <SafeAreaProvider>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="retrieve" options={{headerShown:false}} />
      <Stack.Screen name="store" options={{headerShown:false}} />
    </Stack>
  </SafeAreaProvider>
}

