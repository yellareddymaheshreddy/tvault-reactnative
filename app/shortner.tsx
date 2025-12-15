import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Share,
  Image,
} from "react-native";
import shortenUrl from "./api/shortner";
import Screen from "./components/Screen";
import { generateKey } from "./utils/generateKey";
import { addHistory, HistoryItem } from "./utils/history";

export default function ShortenerScreen() {
  const [url, setUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [short, setShort] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleShorten() {
    if (!url) {
      Alert.alert("Error", "Please enter a URL");
      return;
    }

    setLoading(true);
    try {
      const shortUrl = await shortenUrl(url, shortCode);

      const id = generateKey(6);

      const item: HistoryItem = {
        id,
        original: url,
        short: shortUrl,
        date: new Date().toISOString(),
        type: "url",
      };

      await addHistory(item);

      setShort(shortUrl);
    } catch (err: any) {
      Alert.alert("Error", err.message || "Could not shorten URL");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#0B0E12" }}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Header */}
        <View style={{ padding: 24, paddingTop: 60 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="link-outline" size={26} color="#4C9AFF" />
            <Text
              style={{
                color: "white",
                fontSize: 32,
                fontWeight: "800",
              }}
            >
              URL Shortener
            </Text>
          </View>

          <Text
            style={{
              color: "#9BA4B5",
              marginTop: 8,
              fontSize: 16,
              lineHeight: 22,
            }}
          >
            Enter your long URL to create a short link.
          </Text>
        </View>

        {/* Card Container */}
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: 24,
            padding: 20,
            marginHorizontal: 20,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.08)",
            marginBottom: 24,
          }}
        >
          {/* Inputs */}
          <Text style={{ color: "#9BA4B5", marginBottom: 6, fontSize: 14 }}>
            Long URL
          </Text>
          <TextInput
            placeholder="https://..."
            placeholderTextColor="#6B7280"
            style={{
              backgroundColor: "#111624",
              padding: 16,
              borderRadius: 14,
              color: "white",
              marginBottom: 22,
              fontSize: 16,
            }}
            value={url}
            onChangeText={setUrl}
          />

          <Text style={{ color: "#9BA4B5", marginBottom: 6, fontSize: 14 }}>
            Custom Key (Optional)
          </Text>
          <TextInput
            placeholder="t.mahs.me/ your-key"
            placeholderTextColor="#6B7280"
            style={{
              backgroundColor: "#111624",
              padding: 16,
              borderRadius: 14,
              color: "white",
              marginBottom: 22,
              fontSize: 16,
            }}
            value={shortCode}
            onChangeText={setShortCode}
          />

          {/* Shorten Button */}
          <TouchableOpacity
            onPress={handleShorten}
            disabled={loading}
            style={{
              backgroundColor: "#3B82F6",
              padding: 16,
              borderRadius: 14,
              alignItems: "center",
              shadowColor: "#3B82F6",
              shadowOpacity: 0.4,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
            }}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text
                style={{ color: "white", fontWeight: "700", fontSize: 18 }}
              >
                Shorten URL
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Result Section */}
        {short !== "" && (
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
            {/* Short Result */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Ionicons name="link-outline" size={22} color="#4C9AFF" />
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "700",
                  marginLeft: 10,
                }}
              >
                {short}
              </Text>

              <TouchableOpacity
                onPress={() => Clipboard.setStringAsync(short)}
                style={{
                  marginLeft: "auto",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  padding: 10,
                  borderRadius: 12,
                }}
              >
                <Ionicons name="copy" size={20} color="#C3D4E0" />
              </TouchableOpacity>
            </View>

            {/* QR Code */}
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                padding: 20,
                alignSelf: "center",
                marginBottom: 20,
              }}
            >
              {/* Replace with your QR generator */}
              <Image
                source={{
                  uri: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${short}`,
                }}
                style={{ width: 150, height: 150 }}
              />
            </View>

            {/* Buttons */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {/* Copy */}
              <TouchableOpacity
                onPress={() => Clipboard.setStringAsync(short)}
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  paddingVertical: 12,
                  paddingHorizontal: 18,
                  borderRadius: 14,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons name="copy" size={18} color="#C3D4E0" />
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    marginLeft: 8,
                  }}
                >
                  Copy
                </Text>
              </TouchableOpacity>

              {/* Open */}
              <TouchableOpacity
                onPress={() => Share.share({ message: short })}
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  paddingVertical: 12,
                  paddingHorizontal: 18,
                  borderRadius: 14,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons name="share-social-outline" size={18} color="#C3D4E0" />
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    marginLeft: 8,
                  }}
                >
                  Open
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
