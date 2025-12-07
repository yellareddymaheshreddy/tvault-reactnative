import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import Card from "./components/Card";
import Screen from "./components/Screen";

export default function RetrieveScreen() {
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");

  const load = async () => {
    if (!key) return;
    const val = await AsyncStorage.getItem(key);
    setResult(val ?? "No data found");
  };

  return (
    <Screen>
      <View className="flex-1 bg-background px-5 pt-14">
      <Text className="text-3xl font-bold mb-4 text-center text-primary">
        Retrieve Text
      </Text>

      <Card>
        <Text className="text-lg font-semibold mb-2 text-text">Storage Key</Text>
        <TextInput
          className="border border-border rounded-xl p-3 mb-4 text-text placeholder:text-textSecondary"
          placeholder="Enter key..."
          value={key}
          onChangeText={setKey}
        />

        <Pressable onPress={load} className="bg-secondary p-4 rounded-xl">
          <Text className="text-white font-bold text-center">
            Retrieve
          </Text>
        </Pressable>

        {result ? (
          <View className="mt-4 p-3 bg-card border border-border rounded-xl">
            <Text className="text-text">{result}</Text>
          </View>
        ) : null}
      </Card>

      <Link
        href="/store"
        className="mt-6 text-primary text-center font-medium"
      >
        ← Back to Store
      </Link>
    </View>
    </Screen>
  );
}
