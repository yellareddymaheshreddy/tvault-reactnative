import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

type UrlItem = {
  id: string;
  original: string;
  short: string;
  date: string;
};

export default function UrlCard({
  item,
  onDelete,
}: {
  item: UrlItem;
  onDelete?: (id: string) => void;
}) {
  async function copyToClipboard() {
    await Clipboard.setStringAsync(item.short);
  }

  return (
    <View className="bg-gray-800 p-4 rounded-xl mb-3">
      <Text className="text-blue-400 font-semibold text-lg">{item.short}</Text>

      <Text className="text-gray-400 mt-1">{item.original}</Text>

      <Text className="text-gray-500 text-xs mt-1">
        {new Date(item.date).toLocaleString()}
      </Text>

      <View className="flex-row justify-between items-center mt-3">
        {/* Copy */}
        <TouchableOpacity
          onPress={copyToClipboard}
          className="flex-row items-center"
        >
          <Ionicons name="copy" size={18} color="#60A5FA" />
          <Text className="text-blue-400 ml-1">Copy</Text>
        </TouchableOpacity>

        {/* Delete */}
        {onDelete && (
          <TouchableOpacity
            onPress={() => onDelete(item.id)}
            className="flex-row items-center"
          >
            <Ionicons name="trash" size={18} color="#EF4444" />
            <Text className="text-red-500 ml-1">Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
