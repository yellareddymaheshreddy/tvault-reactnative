import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export default function ActionCard({ title, subtitle, icon, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="bg-gray-900/40 border border-gray-700/30 rounded-2xl px-5 py-6 mb-5"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
      }}
    >
      <View className="flex-row items-center justify-between">
        
        {/* Left Section */}
        <View className="flex-row items-center">
          <View className="w-12 h-12 rounded-full bg-gray-800/60 items-center justify-center mr-4">
            <Ionicons name={icon} size={22} color="#8ab4ff" />
          </View>

          <View>
            <Text className="text-white text-lg font-semibold">{title}</Text>
            <Text className="text-gray-400 text-sm w-48">{subtitle}</Text>
          </View>
        </View>

        {/* Arrow */}
        <Ionicons name="chevron-forward" size={22} color="#6b7280" />
      </View>
    </TouchableOpacity>
  );
}
