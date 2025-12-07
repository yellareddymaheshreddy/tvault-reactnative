import { clearHistory } from "../utils/history";
import React from "react";
import { View, Text, TouchableOpacity, Linking, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GitHubRepoURL } from "../utils/constants";

type IconName = keyof typeof Ionicons.glyphMap;

export default function SettingsScreen() {

  const handleOpenLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    supported
      ? await Linking.openURL(url)
      : Alert.alert("Error", "Cannot open this URL");
  };

  const renderSettingItem = (
    icon: IconName,
    title: string,
    subtitle: string,
    onPress: () => void,
    showDivider: boolean = true
  ) => (
    <View>
      <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center px-4 py-3"
      >
        <View className="w-11 h-11 rounded-full bg-[#1A1F25] justify-center items-center mr-4">
          <Ionicons name={icon} size={22} color="#3B82F6" />
        </View>

        <View className="flex-1">
          <Text className="text-base font-semibold text-text">{title}</Text>
          {subtitle !== "" && (
            <Text className="text-xs text-textSecondary mt-0.5">
              {subtitle}
            </Text>
          )}
        </View>

        <Ionicons name="chevron-forward" size={18} color="#64748B" />
      </TouchableOpacity>

      {/* Divider */}
      {showDivider && (
        <View className="h-[1px] bg-borderLight mx-4" />
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-background p-4">

      {/* Card 1 */}
      <View className="mb-6 bg-card rounded-2xl shadow-sm border border-border">
        <Text className="text-xs font-bold text-textSecondary uppercase tracking-wider ml-4 mt-4 mb-2">
          App Info
        </Text>

        {renderSettingItem(
          "information-circle-outline",
          "About",
          "Version 2.0.0",
          () =>
            Alert.alert(
              "About",
              "tvault v2.0.0\nBuilt with Expo Router & NativeWind"
            )
        )}

        {renderSettingItem(
          "logo-github",
          "Source Code",
          "View on GitHub",
          () => handleOpenLink(GitHubRepoURL),
          false
        )}
      </View>

      {/* Card 2 */}
      <View className="mb-6 bg-card rounded-2xl shadow-sm border border-border">
        <Text className="text-xs font-bold text-textSecondary uppercase tracking-wider ml-4 mt-4 mb-2">
          Preferences
        </Text>

        {renderSettingItem(
          "moon-outline",
          "Theme",
          "System Default",
          () => Alert.alert("Theme", "Theme selection coming soon!"),
          false
        )}
      </View>

      {/* Card 3 */}
      <View className="bg-card rounded-2xl shadow-sm border border-border">
        <Text className="text-xs font-bold text-textSecondary uppercase tracking-wider ml-4 mt-4 mb-2">
          Settings
        </Text>

        {renderSettingItem(
          "trash-outline",
          "Clear History",
          "Clear all history",
          () => {
            clearHistory();
            Alert.alert("History Cleared", "All history has been cleared");
          },
          false
        )}
      </View>

      {/* Footer */}
      <View className="mt-auto items-center p-6">
        <Text className="text-textSecondary text-xs">
          Made with ❤️ by Team TVault
        </Text>
      </View>
    </View>
  );
}
