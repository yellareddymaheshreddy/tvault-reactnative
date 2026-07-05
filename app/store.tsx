import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Screen from "./components/Screen";
import { generateKey } from "./utils/generateKey";
import { addHistory } from "./utils/history";

const API_URL = "https://tvaultsvault.vercel.app/api/text";

export default function StoreScreen() {
  const [key, setKey] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const save = async () => {
    if (!key || !text) {
      Alert.alert("Error", "Please fill in both fields.");
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

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      await addHistory({
        id: generateKey(8),
        original: text.slice(0, 50) + (text.length > 50 ? "..." : ""),
        short: key,
        date: new Date().toISOString(),
        type: "text",
      });

      Alert.alert("Success", "Text stored successfully.");
      setKey("");
      setText("");
    } catch (err: any) {
      Alert.alert("Error", err.message || "Could not save.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1, backgroundColor: "#0B0E12" }}
          contentContainerStyle={{ paddingBottom: 60, paddingHorizontal: 20 }}
        >
          {/* Page Title */}
          <Text
            style={{
              color: "white",
              fontSize: 32,
              fontWeight: "800",
              textAlign: "center",
              marginTop: 50,
              marginBottom: 10,
            }}
          >
            Store Text
          </Text>

          <Text
            style={{
              color: "#9BA4B5",
              textAlign: "center",
              fontSize: 15,
              lineHeight: 22,
              marginBottom: 35,
            }}
          >
            Enter your unique key and the content you want to store.
          </Text>

          {/* Unique Key Input */}
          <View
            style={{
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: "#9BA4B5",
                fontSize: 15,
                marginBottom: 8,
              }}
            >
              Unique Key
            </Text>

            <TextInput
              placeholder="Enter your key..."
              placeholderTextColor="#6B7280"
              value={key}
              onChangeText={setKey}
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: 14,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.08)",
                color: "white",
                paddingHorizontal: 14,
                paddingVertical: 12,
                fontSize: 16,
              }}
            />
          </View>

          {/* Content Input */}
          <View
            style={{
              marginBottom: 30,
              position: "relative",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  color: "#9BA4B5",
                  fontSize: 15,
                }}
              >
                Content
              </Text>

              {/* Scroll to Bottom Button */}
              <TouchableOpacity
                onPress={scrollToBottom}
                style={{
                  padding: 8,
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderRadius: 10,
                }}
              >
                <Ionicons name="arrow-down" size={18} color="#C3D4E0" />
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Type or paste your content here..."
              placeholderTextColor="#6B7280"
              multiline
              value={text}
              onChangeText={setText}
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: 14,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.08)",
                color: "white",
                minHeight: 260,
                maxHeight: 500,
                fontSize: 16,
                padding: 14,
                textAlignVertical: "top",
                lineHeight: 22,
              }}
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={save}
            disabled={loading}
            style={{
              backgroundColor: "#3B82F6",
              paddingVertical: 16,
              borderRadius: 14,
              alignItems: "center",
              shadowColor: "#3B82F6",
              shadowOpacity: 0.3,
              shadowRadius: 10,
            }}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                Save
              </Text>
            )}
          </TouchableOpacity>

          {/* Link to Retrieve */}
          <Link
            href="/retrieve"
            style={{
              marginTop: 30,
              textAlign: "center",
              color: "#4C9AFF",
              fontSize: 15,
            }}
          >
            Go to Retrieve →
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
