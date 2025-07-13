import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useTheme } from "../context/ThemeContext";

const MASCOT = require("../../assets/splash.png"); // Use your mascot or illustration

const EmptyState: React.FC = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.illustrationWrap}>
        <Image
          source={MASCOT}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>
      <Text style={[styles.title, { color: colors.primaryText }]}>
        No Habits Yet
      </Text>
      <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
        Start building your daily habits by adding your first habit!
      </Text>
      <View style={[styles.cta, { backgroundColor: colors.primary }]}>
        <Text style={styles.ctaText}>Tap + to add a habit</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingTop: 32,
  },
  illustrationWrap: {
    backgroundColor: "#F5F5F5",
    borderRadius: 32,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  illustration: {
    width: 90,
    height: 90,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 8,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 18,
  },
  cta: {
    marginTop: 8,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  ctaText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default EmptyState;
