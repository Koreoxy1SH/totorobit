import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Habit } from "../types";
import { useTheme } from "../context/ThemeContext";

interface StatsScreenProps {
  habits: Habit[];
}

const StatsScreen: React.FC<StatsScreenProps> = ({ habits }) => {
  const { colors } = useTheme();
  const totalHabits = habits.length;
  const today = new Date().toISOString().slice(0, 10);
  const completedToday = habits.filter((habit) =>
    habit.completedDates.includes(today)
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
        <Ionicons
          name="stats-chart"
          size={28}
          color={colors.accentText}
          style={{ marginRight: 10 }}
        />
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
          <Ionicons
            name="list"
            size={24}
            color={colors.info}
            style={styles.statIcon}
          />
          <Text style={[styles.statNumber, { color: colors.info }]}>
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
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={colors.success}
            style={styles.statIcon}
          />
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
          <Ionicons
            name="flame"
            size={24}
            color={colors.warning}
            style={styles.statIcon}
          />
          <Text style={[styles.statNumber, { color: colors.warning }]}>
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
          <Ionicons
            name="trophy"
            size={24}
            color={colors.accentText}
            style={styles.statIcon}
          />
          <Text style={[styles.statNumber, { color: colors.accentText }]}>
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
          { backgroundColor: colors.surface, shadowColor: colors.shadow },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.primaryText }]}>
          Habit Overview
        </Text>
        {habits.length === 0 ? (
          <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
            No habits yet.
          </Text>
        ) : (
          habits.map((habit) => (
            <View
              key={habit.id}
              style={[styles.habitRow, { borderBottomColor: colors.divider }]}
            >
              <Text
                style={[styles.habitName, { color: colors.primaryText }]}
                numberOfLines={1}
              >
                {habit.name}
              </Text>
              <View
                style={[
                  styles.streakPill,
                  { backgroundColor: colors.background },
                ]}
              >
                <Ionicons name="flame" size={14} color={colors.success} />
                <Text
                  style={[styles.streakPillText, { color: colors.success }]}
                >
                  {" "}
                  {habit.currentStreak}d
                </Text>
              </View>
              <View
                style={[
                  styles.streakPill,
                  { backgroundColor: colors.surface, marginLeft: 8 },
                ]}
              >
                <Ionicons name="trophy" size={14} color={colors.accentText} />
                <Text
                  style={[styles.streakPillText, { color: colors.accentText }]}
                >
                  {" "}
                  {habit.longestStreak}d
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    gap: 12,
  },
  statCard: {
    width: "47%",
    borderRadius: 18,
    paddingVertical: 22,
    alignItems: "center",
    marginBottom: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  statIcon: {
    marginBottom: 6,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  section: {
    margin: 18,
    borderRadius: 18,
    padding: 18,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 18,
  },
  habitRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  habitName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  streakPill: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginLeft: 2,
  },
  streakPillText: {
    fontSize: 14,
    fontWeight: "700",
  },
});

export default StatsScreen;
