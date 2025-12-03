import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveText(key: string, text: string) {
  await AsyncStorage.setItem(`text_${key}`, text);
}

export async function getText(key: string) {
  return await AsyncStorage.getItem(`text_${key}`);
}
