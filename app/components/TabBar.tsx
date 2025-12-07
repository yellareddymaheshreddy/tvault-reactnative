import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export default function CustomTabBar({ state, descriptors, navigation }:BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const icon =
          route.name === "index"
            ? "home"
            : route.name === "history"
            ? "time"
            : "settings";

        const isFocused = state.index === index;

        const onPress = () => {
          navigation.navigate(route.name);
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabButton}
          >
            <Ionicons
              name={icon}
              size={26}
              color={isFocused ? "#3B82F6" : "#94A3B8"}
            />
            <Text style={[styles.label, isFocused && styles.activeLabel]}>
              {typeof label === 'string' ? label.charAt(0).toUpperCase() + label.slice(1) : route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#0F172A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 0,
    height: 70,
    elevation: 10, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  tabButton: {
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    marginTop: 4,
    fontSize: 12,
    color: "#94A3B8",
  },

  activeLabel: {
    color: "#3B82F6",
    fontWeight: "600",
  },
});
