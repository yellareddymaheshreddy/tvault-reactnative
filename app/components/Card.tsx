import { View } from "react-native";
import React from "react";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <View className="bg-background p-5 rounded-2xl shadow-lg w-full mt-5">
      {children}
    </View>
  );
}
