import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useTheme } from "../context/ThemeContext";

const MASCOT = require("../../assets/splash.png"); // Replace with mascot/logo if available

interface ModernHeaderProps {
  userName?: string;
  totalStreak: number;
  completedToday: number;
  totalHabits: number;
}

const ModernHeader: React.FC<ModernHeaderProps> = ({
  userName = "",
  totalStreak,
  completedToday,
  totalHabits,
}) => {
  const { colors } = useTheme();
  const greeting = userName ? `Hi, ${userName}!` : "Welcome!";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderBottomColor: colors.border },
      ]}
    >
      <View style={styles.row}>
        <Image source={MASCOT} style={styles.mascot} />
        <View style={styles.headerText}>
          <Text style={[styles.greeting, { color: colors.primaryText }]}>
            {greeting}
          </Text>
          <Text style={[styles.appName, { color: colors.accentText }]}>
            Totorobit
          </Text>
        </View>
      </View>
      <View style={styles.streakRow}>
        <Text style={[styles.streak, { color: colors.success }]}>
          🔥 {totalStreak} day streak
        </Text>
        <Text style={[styles.progress, { color: colors.secondaryText }]}>
          {completedToday} / {totalHabits} completed today
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 36,
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  mascot: {
    width: 48,
    height: 48,
    borderRadius: 16,
    marginRight: 16,
    backgroundColor: "#F5F5F5",
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 2,
  },
  appName: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  streakRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  streak: {
    fontSize: 16,
    fontWeight: "700",
  },
  progress: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default ModernHeader;
