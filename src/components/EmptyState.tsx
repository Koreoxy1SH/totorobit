import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EmptyState: React.FC = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="fitness-outline" size={64} color="#CCC" />
      <Text style={styles.title}>No Habits Yet</Text>
      <Text style={styles.subtitle}>
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
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
});

export default EmptyState;
