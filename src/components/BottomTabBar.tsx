import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface BottomTabBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabPress,
}) => {
  const tabs = [
    { id: "habits", label: "Habits", icon: "list" },
    { id: "stats", label: "Stats", icon: "stats-chart" },
    { id: "settings", label: "Settings", icon: "settings" },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          onPress={() => onTabPress(tab.id)}
        >
          <Ionicons
            name={tab.icon as any}
            size={24}
            color={activeTab === tab.id ? "#4CAF50" : "#666"}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === tab.id && styles.activeTabLabel,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingBottom: 20, // Extra padding for safe area
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  activeTab: {
    // Active tab styling
  },
  tabLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    fontWeight: "500",
  },
  activeTabLabel: {
    color: "#4CAF50",
    fontWeight: "600",
  },
});

export default BottomTabBar;
