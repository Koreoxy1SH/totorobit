import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Habit } from "../types";
import { useTheme } from "../context/ThemeContext";

interface StatsScreenProps {
  habits: Habit[];
}

const StatsScreen: React.FC<StatsScreenProps> = ({ habits }) => {
  const { colors } = useTheme();

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
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        <Text style={[styles.title, { color: colors.primaryText }]}>
          Statistics
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <View
          style={[
            styles.statCard,
            { backgroundColor: colors.card, shadowColor: colors.shadow },
          ]}
        >
          <Text style={[styles.statNumber, { color: colors.success }]}>
            {totalHabits}
          </Text>
          <Text style={[styles.statLabel, { color: colors.secondaryText }]}>
            Total Habits
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            { backgroundColor: colors.card, shadowColor: colors.shadow },
          ]}
        >
          <Text style={[styles.statNumber, { color: colors.success }]}>
            {completedToday}
          </Text>
          <Text style={[styles.statLabel, { color: colors.secondaryText }]}>
            Completed Today
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            { backgroundColor: colors.card, shadowColor: colors.shadow },
          ]}
        >
          <Text style={[styles.statNumber, { color: colors.success }]}>
            {totalStreak}
          </Text>
          <Text style={[styles.statLabel, { color: colors.secondaryText }]}>
            Total Streak
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            { backgroundColor: colors.card, shadowColor: colors.shadow },
          ]}
        >
          <Text style={[styles.statNumber, { color: colors.success }]}>
            {longestStreak}
          </Text>
          <Text style={[styles.statLabel, { color: colors.secondaryText }]}>
            Longest Streak
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.section,
          { backgroundColor: colors.card, shadowColor: colors.shadow },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.primaryText }]}>
          Habit Overview
        </Text>
        {habits.map((habit) => (
          <View
            key={habit.id}
            style={[styles.habitStat, { borderBottomColor: colors.divider }]}
          >
            <Text style={[styles.habitName, { color: colors.primaryText }]}>
              {habit.name}
            </Text>
            <View style={styles.habitStats}>
              <Text
                style={[styles.habitStatText, { color: colors.secondaryText }]}
              >
                Current: {habit.currentStreak} days
              </Text>
              <Text
                style={[styles.habitStatText, { color: colors.secondaryText }]}
              >
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
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    gap: 12,
  },
  statCard: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    flex: 1,
    minWidth: "45%",
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
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    textAlign: "center",
  },
  section: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
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
    marginBottom: 12,
  },
  habitStat: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  habitStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  habitStatText: {
    fontSize: 14,
  },
});

export default StatsScreen;
