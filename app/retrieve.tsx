import { Link } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Clipboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Card from "./components/Card";
import Screen from "./components/Screen";

const API_URL = "https://tvault.mahs.me/api/text";

export default function RetrieveScreen() {
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!key) {
      Alert.alert("Error", "Please enter a key");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?key=${encodeURIComponent(key)}`, {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data.text ?? "No data found");
    } catch (error) {
      Alert.alert("Error", `Failed to retrieve: ${error instanceof Error ? error.message : "Unknown error"}`);
      setResult("No data found");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!result) return;
    await Clipboard.setString(result);
    Alert.alert("Copied", "Text copied to clipboard!");
  };

  return (
    <Screen>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView className="flex-1 bg-background px-5 pt-14" contentContainerStyle={{ paddingBottom: 40 }}>
          <Text className="text-3xl font-bold mb-4 text-center text-primary">
            Retrieve Text
          </Text>

          <Card>
            <Text className="text-lg font-semibold mb-2 text-text">Storage Key</Text>
            <TextInput
              className="border border-border rounded-xl p-3 mb-4 placeholder:text-textSecondary"
              placeholder="Enter key..."
              value={key}
              onChangeText={setKey}
            />

            <Pressable onPress={load} className="bg-secondary p-4 rounded-xl" disabled={loading}>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-center">
                  Retrieve
                </Text>
              )}
            </Pressable>

            {result ? (
              <View className="mt-4">
                <View className="p-3 bg-card border border-border rounded-xl mb-3">
                  <Text className="text-text">{result}</Text>
                </View>
                <Pressable onPress={copyToClipboard} className="bg-primary p-4 rounded-xl">
                  <Text className="text-white font-bold text-center">📋 Copy to Clipboard</Text>
                </Pressable>
              </View>
            ) : null}
          </Card>

          <Link
            href="/store"
            className="mt-6 text-primary text-center font-medium"
          >
            ← Back to Store
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
