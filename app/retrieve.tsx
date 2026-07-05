import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
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
import * as Clipboard from "expo-clipboard";

const API_URL = "https://tvaultsvault.vercel.app/api/text";

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
      const response = await fetch(`${API_URL}?key=${encodeURIComponent(key)}`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data.text ?? "");
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to retrieve");
      setResult("");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await Clipboard.setStringAsync(result);
    Alert.alert("Copied!", "Text copied to clipboard.");
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={{ flex: 1, backgroundColor: "#0B0E12" }}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          {/* Page Title */}
          <View style={{ paddingHorizontal: 20 }}>
            <Text
              style={{
                color: "white",
                fontSize: 32,
                fontWeight: "800",
                marginBottom: 8,
                marginTop: 16,
              }}
            >
              Retrieve Text
            </Text>

            <Text
              style={{
                color: "#9BA4B5",
                fontSize: 15,
                lineHeight: 22,
                marginBottom: 24,
              }}
            >
              Enter your unique key to securely fetch your stored content.
            </Text>
          </View>

          {/* Input Card */}
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRadius: 24,
              padding: 20,
              marginHorizontal: 20,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.08)",
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                color: "#9BA4B5",
                fontSize: 14,
                marginBottom: 6,
              }}
            >
              Unique Key
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#111624",
                paddingHorizontal: 14,
                paddingVertical: 12,
                borderRadius: 14,
                marginBottom: 22,
              }}
            >
              <Ionicons name="key-outline" size={18} color="#6B7280" />
              <TextInput
                placeholder="Enter your unique key..."
                placeholderTextColor="#6B7280"
                value={key}
                onChangeText={setKey}
                style={{
                  flex: 1,
                  color: "white",
                  marginLeft: 10,
                  fontSize: 16,
                }}
              />
            </View>

            {/* Fetch Button */}
            <TouchableOpacity
              onPress={load}
              disabled={loading}
              style={{
                backgroundColor: "#1E293B",
                paddingVertical: 14,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text
                  style={{
                    color: "white",
                    fontSize: 17,
                    fontWeight: "600",
                  }}
                >
                  Fetch Text
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Retrieved Text Card */}
          {result !== "" && (
            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: 24,
                padding: 20,
                marginHorizontal: 20,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 6,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "700",
                    flex: 1,
                  }}
                >
                  Your Retrieved Text
                </Text>

                {/* Copy Icon */}
                <TouchableOpacity
                  onPress={handleCopy}
                  style={{
                    padding: 10,
                    backgroundColor: "rgba(255,255,255,0.08)",
                    borderRadius: 12,
                  }}
                >
                  <Ionicons name="copy" size={19} color="#C3D4E0" />
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  color: "#AAB5C2",
                  fontSize: 15,
                  lineHeight: 22,
                  marginTop: 6,
                }}
              >
                {result}
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
