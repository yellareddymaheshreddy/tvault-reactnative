// import { View, Text, TouchableOpacity } from "react-native";
import { clearHistory } from "../utils/history";

// export default function Settings() {
//   return (
//     <View className="flex-1 bg-gray-950 p-6">
//       <Text className="text-white text-2xl font-bold mb-6">Settings</Text>

//       <TouchableOpacity
//         onPress={clearHistory}
//         className="bg-red-600 p-4 rounded-xl active:bg-red-700"
//       >
//         <Text className="text-center text-white font-bold">Clear History</Text>
//       </TouchableOpacity>

//       <Text className="text-gray-400 mt-6">
//         tVault URL Shortener App — built with Expo & NativeWind
//       </Text>
//     </View>
//   );
// }


import React from 'react';
import { View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
type IconName = keyof typeof Ionicons.glyphMap;
export default function SettingsScreen() {
    const handleOpenLink = async (url:string) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert('Error', 'Cannot open this URL');
        }
    };

    const renderSettingItem = (icon:IconName, title:string, subtitle:string, onPress:()=>void) => (
        <TouchableOpacity className="flex-row items-center p-4 border-t border-background" onPress={onPress}>
            <View className="w-10 h-10 rounded-full bg-background justify-center items-center mr-4">
                <Ionicons name={icon} size={24} color="#2563EB" />
            </View>
            <View className="flex-1">
                <Text className="text-base font-semibold text-text">{title}</Text>
                {subtitle && <Text className="text-xs text-textSecondary mt-0.5">{subtitle}</Text>}
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748B" />
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-background p-4">
            <View className="mb-6 bg-card rounded-2xl overflow-hidden shadow-sm border border-border">
                <Text className="text-xs font-bold text-textSecondary uppercase tracking-wider ml-4 mt-4 mb-2">
                    App Info
                </Text>
                {renderSettingItem(
                    'information-circle-outline',
                    'About',
                    'Version 2.0.0',
                    () => Alert.alert('About', 'tvault v2.0.0\nBuilt with Expo Router & NativeWind')
                )}
                {renderSettingItem(
                    'logo-github',
                    'Source Code',
                    'View on GitHub',
                    () => handleOpenLink('https://github.com')
                )}
            </View>

            <View className="mb-6 bg-card rounded-2xl overflow-hidden shadow-sm border border-border">
                <Text className="text-xs font-bold text-textSecondary uppercase tracking-wider ml-4 mt-4 mb-2">
                    Preferences
                </Text>
                {renderSettingItem(
                    'moon-outline',
                    'Theme',
                    'System Default',
                    () => Alert.alert('Theme', 'Theme selection coming soon!')
                )}
            </View>
            <View className="mb-6 bg-card rounded-2xl overflow-hidden shadow-sm border border-border">
                <Text className="text-xs font-bold text-textSecondary uppercase tracking-wider ml-4 mt-4 mb-2">
                    Settings
                </Text>
                {renderSettingItem(
                    'settings',
                    'Clear History',
                    'Clear all history',
                    () => {
                      clearHistory();
                      Alert.alert('History Cleared', 'All history has been cleared')
                    }
                )}
            </View>

            <View className="mt-auto items-center p-6">
                <Text className="text-textSecondary text-xs">Made with ❤️ using React Native</Text>
            </View>
        </View>
    );
}