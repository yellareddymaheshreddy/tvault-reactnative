import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import Card from "./components/Card";
import Screen from "./components/Screen";

export default function StoreScreen() {
  const [key, setKey] = useState("");
  const [text, setText] = useState("");

  const save = async () => {
    if (!key) return;
    await AsyncStorage.setItem(key, text);
    alert("Saved successfully!");
  };

  return (
    <Screen>
      <View className="flex-1 bg-background px-5 pt-14">
      <Text className="text-3xl font-bold mb-4 text-center text-primary">
        T-Vault
      </Text>

      <Card>
        <Text className="text-lg font-semibold mb-2 text-text">Storage Key</Text>
        <TextInput
          className="border border-border rounded-xl p-3 mb-4 text-text placeholder:text-textSecondary"
          placeholder="Enter unique key..."
          value={key}
          onChangeText={setKey}
        />

        <Text className="text-lg font-semibold mb-2 text-text">
          Your Text
        </Text>
        <TextInput
          className="border border-border rounded-xl p-3 h-32 text-text placeholder:text-textSecondary"
          placeholder="Enter content..."
          value={text}
          multiline
          onChangeText={setText}
        />

        <Pressable
          onPress={save}
          className="bg-primary p-4 rounded-xl mt-4"
        >
          <Text className="text-white font-bold text-center">Save Text</Text>
        </Pressable>
      </Card>

      <Link
        href="/retrieve"
        className="mt-6 text-primary text-center font-medium"
      >
        Go to Retrieve →
      </Link>
    </View>
    </Screen>
  );
}
