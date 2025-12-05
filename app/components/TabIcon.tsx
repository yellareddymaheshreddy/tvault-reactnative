import { View, Text, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconName = keyof typeof Ionicons.glyphMap;

// Responsive dynamic sizing
const { width } = Dimensions.get("window");
const ICON_SIZE = width < 380 ? 20 : width < 600 ? 24 : 28;
const PILL_PADDING_X = width < 380 ? 10 : width < 600 ? 12 : 14;
const PILL_PADDING_Y = width < 380 ? 6 : width < 600 ? 7 : 8;

export default function TabIcon({
  focused,
  label,
  icon,
  color,
}: {
  focused: boolean;
  label: string;
  icon: IconName;
  color: string; // tailwind classes like bg-blue-600
}) {
  return (
    <View className="items-center justify-center relative">
      {/* Active pill background */}
      {focused && (
        <View
          style={{
            paddingHorizontal: PILL_PADDING_X,
            paddingVertical: PILL_PADDING_Y,
          }}
          className={`absolute rounded-full ${color} shadow-lg shadow-black/30`}
        />
      )}

      {/* Icon */}
      <Ionicons
        name={icon}
        size={ICON_SIZE}
        color={focused ? "white" : "#64748B"}
        style={{ zIndex: 10 }}
      />

      {/* Label */}
      <Text
        className={`mt-1 text-[11px] ${
          focused ? "text-white font-semibold" : "text-slate-400"
        }`}
        style={{ zIndex: 10 }}
      >
        {label}
      </Text>
    </View>
  );
}
