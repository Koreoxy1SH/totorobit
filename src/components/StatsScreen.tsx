import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Habit } from "../types";

interface StatsScreenProps {
  habits: Habit[];
}

const StatsScreen: React.FC<StatsScreenProps> = ({ habits }) => {
  const totalHabits = habits.length;
  const completedToday = habits.filter((habit) =>
    habit.completedDates.includes(
      habit.completedDates[habit.completedDates.length - 1] || ""
    )
  ).length;
  const totalStreak = habits.reduce(
    (total, habit) => total + habit.currentStreak,
    0
  );
  const longestStreak = habits.reduce(
    (max, habit) => Math.max(max, habit.longestStreak),
    0
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Statistics</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalHabits}</Text>
          <Text style={styles.statLabel}>Total Habits</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{completedToday}</Text>
          <Text style={styles.statLabel}>Completed Today</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalStreak}</Text>
          <Text style={styles.statLabel}>Total Streak</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{longestStreak}</Text>
          <Text style={styles.statLabel}>Longest Streak</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Habit Overview</Text>
        {habits.map((habit) => (
          <View key={habit.id} style={styles.habitStat}>
            <Text style={styles.habitName}>{habit.name}</Text>
            <View style={styles.habitStats}>
              <Text style={styles.habitStatText}>
                Current: {habit.currentStreak} days
              </Text>
              <Text style={styles.habitStatText}>
                Longest: {habit.longestStreak} days
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    gap: 12,
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    flex: 1,
    minWidth: "45%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  section: {
    backgroundColor: "white",
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  habitStat: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  habitName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  habitStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  habitStatText: {
    fontSize: 14,
    color: "#666",
  },
});

export default StatsScreen;
