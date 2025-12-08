import { View, Text, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import ActionCard from "../components/ActionCard";

export const features = [
  {
    title: "Instant Storage",
    description: "Save any text or note in seconds with a unique code.",
  },
  {
    title: "Quick Retrieve",
    description: "Enter the code to instantly pull the saved content from the cloud.",
  },
  {
    title: "No Login Required",
    description: "Share text between devices or people without creating an account.",
  },
  {
    title: "Temporary by Design",
    description: "Use short-lived codes for simple, throwaway text sharing.",
  }
];

export const howItWorks = [
  {
    title: "Step 1",
    description: "Store any text or note inside the vault.",
  },
  {
    title: "Step 2",
    description: "Vault saves it securely in the cloud with a unique code.",
  },
  {
    title: "Step 3",
    description: "Retrieve your content instantly using the code.",
  }
];

export default function Home() {
  const router = useRouter();
  return (
    <ScrollView className="flex-1 bg-gray-950 px-6 pt-10" style={{ flex: 1, backgroundColor: "#000000" }}>

      {/* Hero Section */}
      <View className="items-center mb-12">
        <Image
          source={require("../../assets/icons/splash-icon-light.png")}
          className="w-24 h-24 mb-4"
        />
        <Text className="text-white text-4xl font-extrabold text-center mb-2">
          Welcome to TVault
        </Text>
        <Text className="text-gray-400 text-center text-lg leading-6">
          Quickly store, share, and retrieve text and notes using simple one-time codes.
        </Text>
      </View>
      {/* Action Buttons */}
      <Text className="text-white text-xl font-bold mb-4">Get Started</Text>

      <ActionCard
        title="Store Text"
        subtitle="Securely save private notes and links."
        icon="document-text-outline"
        onPress={() => router.push("/store")}
      />

      {/* Retrieve Card */}
      <ActionCard
        title="Retrieve Text"
        subtitle="Access your saved content with a key."
        icon="search-outline"
        onPress={() => router.push("/retrieve")}
      />

      {/* URL Shortener Card */}
      <ActionCard
        title="URL Shortener"
        subtitle="Shorten and manage your links quickly."
        icon="link-outline"
        onPress={() => router.push("/shortner")}
      />

      {/* Feature Section */}
      <Text className="text-white text-2xl font-bold mb-4">Features</Text>
      {features.map((feature, index) => (
        <View key={index} className="bg-gray-900 p-5 rounded-xl mb-4">
          <Text className="text-white text-xl font-semibold mb-1">{feature.title}</Text>
          <Text className="text-gray-400">
            {feature.description}
          </Text>
        </View>
      ))}

      {/* How It Works */}
      <Text className="text-white text-2xl font-bold mt-8 mb-4">How it works</Text>
      {howItWorks.map((step, index) => (
        <View key={index} className="bg-gray-900 p-5 rounded-xl mb-4">
          <Text className="text-white font-semibold mb-1">{step.title}</Text>
          <Text className="text-gray-400">{step.description}</Text>
        </View>
      ))}
      <View className="pb-10"></View>

    </ScrollView>
  );
}
