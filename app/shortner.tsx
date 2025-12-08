import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from 'expo-clipboard';
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import shortenUrl from "./api/shortner";
import Screen from "./components/Screen";
import { generateKey } from "./utils/generateKey";
import { addHistory, HistoryItem } from "./utils/history";

export default function Home() {
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");

  async function handleShorten() {
    if (!url) return;

    const shortUrl = await shortenUrl(url);
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
  }

  return (
    <Screen>
      <ScrollView style={{ flex: 1, backgroundColor: "#000000" }} className="flex-1 bg-background p-6" contentContainerStyle={{ paddingBottom: 40 }}>
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
      {/* Navigation Buttons */}
      <View className="mt-10">

        <Link
          href="/store"
          asChild
        >
          <TouchableOpacity className="bg-green-600 p-4 rounded-xl mb-4 active:bg-green-700">
            <Text className="text-center text-white font-bold">Go to Store Text</Text>
          </TouchableOpacity>
        </Link>

        <Link
          href="/retrieve"
          asChild
        >
          <TouchableOpacity className="bg-purple-600 p-4 rounded-xl active:bg-purple-700">
            <Text className="text-center text-white font-bold">Go to Retrieve Text</Text>
          </TouchableOpacity>
        </Link>

      </View>
      </ScrollView>
    </Screen>
  );
}
