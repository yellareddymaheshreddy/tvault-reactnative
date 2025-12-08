import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import React, { useState } from "react";
import { Alert, Linking, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import DarkAlert from "../components/DarkAlert";
import { GitHubRepoURL } from "../utils/constants";
import { clearHistory } from "../utils/history";

export const openNotificationSettings = async () => {
  try {
    if (Platform.OS === "ios") {
      // iOS opens directly into app settings (contains notification toggle)
      await Linking.openURL("app-settings:");
    } else {
      // Android: opens App Notification Settings directly
      await Linking.sendIntent('android.settings.APP_NOTIFICATION_SETTINGS', [{ key: 'android.provider.extra.APP_PACKAGE', value: 'com.yellareddymaheshreddy.tvault' }]);
    }
  } catch (error) {
    console.log("Error opening notification settings:", error);
  }
};

const openAppSettings = async () => {
  try {
    await Linking.openSettings();
  } catch (e) {
    Alert.alert("Error", "Unable to open app settings");
  }
};

const appVersion = Constants.expoConfig?.version ?? "1.0.0";
const buildNumber = Constants.expoConfig?.ios?.buildNumber ?? "1";

type IconName = keyof typeof Ionicons.glyphMap;

export default function SettingsScreen() {
  const [resetModal, setResetModal] = useState(false);


  const handleOpenLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (e) {
      Alert.alert("Error", "Cannot open this link");
    }
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
        className="flex-row items-center px-4 py-4 active:opacity-80"
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

      {showDivider && <View className="h-[1px] bg-borderLight mx-4" />}
    </View>
  );

  return (
    <View className="flex-1 bg-background">

      {/* Make scrollable */}
      <ScrollView
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 60 }}
      >

        <Text
          style={{
            color: "white",
            fontSize: 34,
            fontWeight: "700",
            marginBottom: 16,
          }}
        >
          Settings
        </Text>

        {/* Card 1 — App Info */}
        <View className="mb-6 bg-card rounded-2xl shadow-sm border border-border">
          <Text className="text-xs font-bold text-textSecondary uppercase tracking-wider ml-4 mt-4 mb-2">
            App Info
          </Text>

          {renderSettingItem(
            "information-circle-outline",
            "About",
            `Version ${appVersion} (Build ${buildNumber})`,
            () =>
              Alert.alert(
                "About TVault",
                `TVault v${appVersion} (Build ${buildNumber})\nMade with Expo Router`
              )
          )}

          {renderSettingItem(
            "logo-github",
            "Source Code",
            "View on GitHub",
            () => setResetModal(true)
          )}

          {renderSettingItem(
            "document-text-outline",
            "Changelog",
            "See what's new",
            () => Alert.alert("Changelog", "Changelog page coming soon"),
          )}

          {renderSettingItem(
            "globe-outline",
            "Website",
            "Open official site",
            () => handleOpenLink("https://tsvault.vercel.app"),
            false
          )}

        </View>

        {/* Card 2 — Preferences */}
        <View className="mb-6 bg-card rounded-2xl shadow-sm border border-border">
          <Text className="text-xs font-bold text-textSecondary uppercase tracking-wider ml-4 mt-4 mb-2">
            Preferences
          </Text>

          {renderSettingItem(
            "moon-outline",
            "Theme",
            "System Default",
            () => Alert.alert("Theme", "Theme selection coming soon")
          )}

          {renderSettingItem(
            "notifications-outline",
            "Notifications",
            "Open notification settings",
            () => openNotificationSettings(),
            false
          )}
        </View>

        {/* Card 3 — Account & Support */}
        <View className="mb-6 bg-card rounded-2xl shadow-sm border border-border">
          <Text className="text-xs font-bold text-textSecondary uppercase tracking-wider ml-4 mt-4 mb-2">
            Support & Feedback
          </Text>

          {renderSettingItem(
            "mail-outline",
            "Contact Support",
            "Report issues or ask doubts",
            () => handleOpenLink("mailto:yellareddymaheshreddy@gmail.com")
          )}

          {renderSettingItem(
            "star-outline",
            "Rate This App",
            "Your feedback helps",
            () => Alert.alert("Rate App", "Redirect to Play Store soon")
          )}

          {renderSettingItem(
            "person-outline",
            "Developer",
            "View my profile",
            () => handleOpenLink("https://github.com/yellareddymaheshreddy"),
            false
          )}
        </View>

        {/* Card 4 — Privacy & Legal */}
        <View className="mb-6 bg-card rounded-2xl shadow-sm border border-border">
          <Text className="text-xs font-bold text-textSecondary uppercase tracking-wider ml-4 mt-4 mb-2">
            Privacy & Legal
          </Text>

          {renderSettingItem(
            "shield-checkmark-outline",
            "Privacy Policy",
            "Your data & rights",
            () => handleOpenLink("https://tsvault.vercel.app/privacy"),
          )}

          {renderSettingItem(
            "document-lock-outline",
            "Terms of Service",
            "Read terms & usage",
            () => handleOpenLink("https://tsvault.vercel.app/terms"),
            false
          )}
        </View>

        {/* Card 5 — Danger Zone */}
        <View className="bg-card rounded-2xl shadow-sm border border-border">
          <Text className="text-xs font-bold text-red-400 uppercase tracking-wider ml-4 mt-4 mb-2">
            Danger Zone
          </Text>

          {renderSettingItem(
            "trash-outline",
            "Clear History",
            "Delete all stored history",
            async () => {
              await clearHistory();
              Alert.alert("History Cleared", "All history has been removed.");
            }
          )}

          {renderSettingItem(
            "alert-circle-outline",
            "Reset App",
            "Remove all data",
            () => openAppSettings(),
            false
          )}
        </View>

        {/* Footer */}
        <View className="items-center pt-10">
          <Text className="text-textSecondary text-xs">
            Made with ❤️ in India
          </Text>
        </View>

      </ScrollView>


      <DarkAlert
        visible={resetModal}
        title="Open Github"
        message="This will open GitHub page. Do you want to proceed?"
        onCancel={() => setResetModal(false)}
        onConfirm={() => {
          setResetModal(false);
          Linking.openURL(GitHubRepoURL);
        }}
        confirmText="Open Github"
        cancelText="Cancel"
      />
    </View>
  );
}
