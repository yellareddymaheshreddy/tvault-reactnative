import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { shortenUrl } from "../api/shortner";
import { addHistory, HistoryItem } from "../utils/history";
import { generateKey } from "../utils/generateKey";
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from "@expo/vector-icons";
    import { Alert } from 'react-native';
export default function Home() {
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");

  async function handleShorten() {
    if (!url) return;

    const shortUrl = await shortenUrl(url);
    const id = generateKey(6);

    const item :HistoryItem= {
      id,
      original: url,
      short: shortUrl,
      date: new Date().toISOString(),
    };

    await addHistory(item);

    setShort(shortUrl);
  }

  return (
    <View className="flex-1 bg-gray-950 p-6">
      <Text className="text-white text-3xl font-bold mb-6">Shorten URL</Text>

      <TextInput
        placeholder="Enter URL"
        placeholderTextColor="#888"
        className="bg-gray-800 text-white p-4 rounded-xl mb-4"
        value={url}
        onChangeText={setUrl}
      />

      <TouchableOpacity
        onPress={handleShorten}
        className="bg-blue-600 p-4 rounded-xl active:bg-blue-700"
      >
        <Text className="text-center text-white font-bold">Shorten</Text>
      </TouchableOpacity>

      {short ? (
        <View className="mt-6 bg-gray-800 p-4 rounded-xl">
          <Text className="text-center text-blue-400 text-lg" >{short}</Text>
          <Ionicons name="copy" className=" absolute right-4 top-4" size={20} color={"white"} 
          onPress={async()=>{
            Alert.alert(
      "Copied !!!",
      "Copied to clipboard!"
    );
            await Clipboard.setStringAsync(short)
          }}/>
        </View>
      ) : null}
    </View>
  );
}
