import { Tabs } from "expo-router";
import TabIcon from "../components/TabIcon";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          // position: "absolute",
          // bottom: 22,
          // left: 20,
          // right: 20,
          // height: 68,
          // borderRadius: 35,
          backgroundColor: "#0F172A",
          borderTopWidth: 0,
          // elevation: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Home" icon="home" color="bg-blue-600" />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="History" icon="time" color="bg-green-600" />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Settings" icon="settings" color="bg-purple-600" />
          ),
        }}
      />
    </Tabs>
  );
}
