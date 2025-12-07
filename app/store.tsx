import { Link } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput } from "react-native";
import Card from "./components/Card";
import Screen from "./components/Screen";

const API_URL = "https://tvault.mahs.me/api/text";

export default function StoreScreen() {
  const [key, setKey] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const save = async () => {
    if (!key || !text) {
      Alert.alert("Error", "Please fill in both key and text");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({ key, text }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      Alert.alert("Success", "Text saved to cloud successfully!");
      setKey("");
      setText("");
    } catch (error) {
      Alert.alert("Error", `Failed to save: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView className="flex-1 bg-background px-5 pt-14" contentContainerStyle={{ paddingBottom: 40 }}>
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
              className="border border-border rounded-xl p-3 text-text placeholder:text-textSecondary"
              placeholder="Enter content..."
              value={text}
              multiline
              textAlignVertical="top"
              numberOfLines={10}
              onChangeText={setText}
              style={{ minHeight: 200, maxHeight: 400 }}
            />

            <Pressable
              onPress={save}
              className="bg-primary p-4 rounded-xl mt-4"
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-center">Save Text</Text>
              )}
            </Pressable>
          </Card>

          <Link
            href="/retrieve"
            className="mt-6 text-primary text-center font-medium"
          >
            Go to Retrieve →
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
