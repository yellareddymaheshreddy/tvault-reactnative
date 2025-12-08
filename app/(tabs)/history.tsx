import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import React, { useState } from "react";
import { Alert, ScrollView, Share, Text, TouchableOpacity, View } from "react-native";
import { getHistory, HistoryItem } from "../utils/history";

export default function HistoryScreen() {
  const [activeTab, setActiveTab] = useState<"url" | "text">("url");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history on mount and refresh
  const loadHistory = async () => {
    const data = await getHistory();
    setHistory(data);
  };

  // Reload history every time screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadHistory();
    }, [])
  );

  // useEffect(() => {
  //   loadHistory();
    
  //   // Refresh history every 10 seconds to clean up old items
  //   const interval = setInterval(loadHistory, 10000);
  //   return () => clearInterval(interval);
  // }, []);

  // Filter by type
  const filtered = history.filter((item) => item.type === activeTab);

  const handleCopy = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied!", "Copied to clipboard");
  };

  const handleShare = async (text: string) => {
    try {
      await Share.share({ message: text });
    } catch (error) {
      console.error("Share error:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000000", paddingTop: 60 }}>
      {/* Header */}
      <Text
        style={{
          color: "white",
          fontSize: 34,
          fontWeight: "700",
          paddingHorizontal: 20,
          marginBottom: 16,
        }}
      >
        History{" "}
        <Ionicons name="time-outline" size={26} color="#94A3B8" />
      </Text>

      {/* 24hr Notice */}
      <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
        <Text style={{ color: "#94A3B8", fontSize: 13 }}>
          ⏱️ Showing last 24 hours only (Redis TTL)
        </Text>
      </View>

      {/* Tabs */}
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 20,
          backgroundColor: "#161B22",
          padding: 4,
          borderRadius: 14,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => setActiveTab("url")}
          style={{
            flex: 1,
            paddingVertical: 10,
            backgroundColor: activeTab === "url" ? "#1E293B" : "transparent",
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: activeTab === "url" ? "white" : "#94A3B8",
              textAlign: "center",
              fontWeight: "600",
              fontSize: 15,
            }}
          >
            URLs
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("text")}
          style={{
            flex: 1,
            paddingVertical: 10,
            backgroundColor: activeTab === "text" ? "#1E293B" : "transparent",
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: activeTab === "text" ? "white" : "#94A3B8",
              textAlign: "center",
              fontWeight: "600",
              fontSize: 15,
            }}
          >
            Texts
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      >
        {filtered.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 80 }}>
            <Ionicons name="time" size={60} color="#475569" />
            <Text
              style={{
                color: "#94A3B8",
                fontSize: 16,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              No {activeTab === "url" ? "URL" : "text"} history yet!{"\n"}
              Start {activeTab === "url" ? "shortening URLs" : "storing texts"}.
            </Text>
          </View>
        ) : (
          filtered.map((item) => (
            <View
              key={item.id}
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: 18,
                padding: 16,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              {/* Title */}
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "700",
                  marginBottom: 4,
                }}
              >
                {item.short ?? "Stored Text"}
              </Text>

              {/* Original Content */}
              <Text
                style={{
                  color: "#A5B4C3",
                  fontSize: 13,
                  marginBottom: 8,
                }}
              >
                {activeTab === "url" ? "Original: " : ""}
                {item.original.length > 60
                  ? item.original.slice(0, 60) + "..."
                  : item.original}
              </Text>

              {/* Date */}
              <Text
                style={{
                  color: "#94A3B8",
                  fontSize: 12,
                  marginBottom: 10,
                }}
              >
                Created: {new Date(item.date).toLocaleString()}
              </Text>

              {/* Buttons */}
              <View style={{ flexDirection: "row", gap: 14 }}>
                {/* Copy Button */}
                <TouchableOpacity
                  onPress={() => handleCopy(item.short ?? item.original)}
                  style={{
                    padding: 10,
                    backgroundColor: "rgba(59,130,246,0.15)",
                    borderRadius: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Ionicons name="copy" size={20} color="#3B82F6" />
                  <Text style={{ color: "#3B82F6", fontSize: 13, fontWeight: "600" }}>
                    Copy
                  </Text>
                </TouchableOpacity>

                {/* Share Button */}
                <TouchableOpacity
                  onPress={() => handleShare(item.short ?? item.original)}
                  style={{
                    padding: 10,
                    backgroundColor: "rgba(16,185,129,0.15)",
                    borderRadius: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Ionicons name="share-social-outline" size={20} color="#10B981" />
                  <Text style={{ color: "#10B981", fontSize: 13, fontWeight: "600" }}>
                    Share
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
