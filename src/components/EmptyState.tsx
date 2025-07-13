import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const EmptyState: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Ionicons name="fitness-outline" size={64} color={colors.secondaryText} />
      <Text style={[styles.title, { color: colors.primaryText }]}>
        No Habits Yet
      </Text>
      <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
        Start building your daily habits by adding your first habit!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
});

export default EmptyState;
