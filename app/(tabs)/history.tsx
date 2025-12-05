import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { getHistory, HistoryItem } from "../utils/history";
import { Ionicons } from "@expo/vector-icons";

export default function History() {
  const [list, setList] = useState<HistoryItem[]>([]);

  async function load() {
    const data = await getHistory();
    setList(data);
  }

  useEffect(() => {
    load();
  }, []);

  if (list.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-950">
        <Text className="text-gray-400 text-lg">No history yet</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-950 p-6">
      <Text className="text-white text-2xl font-bold mb-4">History</Text>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-gray-800 rounded-xl p-4 mb-4">
            <Text className="text-white font-semibold">{item.short}</Text>
            <Text className="text-gray-400 mt-1">{item.original}</Text>

            <TouchableOpacity className="mt-2 flex-row items-center">
              <Ionicons name="copy" size={18} color="#60A5FA" />
              <Text className="text-blue-400 ml-2">Copy</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
