import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "tvault_history";


export type HistoryItem = {
  id: string;
  original: string;
  short: string;
  date: string; // ISO string
};


export async function getHistory(): Promise<HistoryItem[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return [];

    const list: HistoryItem[] = JSON.parse(raw);

    
    return list.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (err) {
    console.error("Failed to load history:", err);
    return [];
  }
}


export async function addHistory(item: HistoryItem) {
  try {
    const existing = await getHistory();
    existing.unshift(item); // add to top

    await AsyncStorage.setItem(KEY, JSON.stringify(existing));
  } catch (err) {
    console.error("Failed to save history:", err);
  }
}


export async function clearHistory() {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch (err) {
    console.error("Failed to clear history:", err);
  }
}
