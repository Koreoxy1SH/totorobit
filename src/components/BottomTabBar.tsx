import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

interface BottomTabBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabPress,
}) => {
  const { colors } = useTheme();

  const tabs = [
    { id: "habits", label: "Habits", icon: "list" },
    { id: "stats", label: "Stats", icon: "stats-chart" },
    { id: "settings", label: "Settings", icon: "settings" },
  ];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderTopColor: colors.border },
      ]}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          onPress={() => onTabPress(tab.id)}
        >
          <Ionicons
            name={tab.icon as any}
            size={24}
            color={activeTab === tab.id ? colors.primary : colors.secondaryText}
          />
          <Text
            style={[
              styles.tabLabel,
              {
                color:
                  activeTab === tab.id ? colors.primary : colors.secondaryText,
              },
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
    borderTopWidth: 1,
    paddingBottom: 1,
    paddingTop: 1,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  activeTab: {
    // Active tab styling
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 6,
    fontWeight: "500",
  },
  activeTabLabel: {
    fontWeight: "600",
  },
});

export default BottomTabBar;
