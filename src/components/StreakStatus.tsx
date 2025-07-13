import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Habit } from "../types";
import { getStreakEmoji } from "../utils/dateUtils";
import { useTheme } from "../context/ThemeContext";

interface StreakStatusProps {
  habit: Habit;
}

const StreakStatus: React.FC<StreakStatusProps> = ({ habit }) => {
  const { colors, isDarkMode } = useTheme();
  const isCompletedToday = habit.completedDates.includes(
    habit.completedDates[habit.completedDates.length - 1] || ""
  );

  return (
    <View style={styles.container}>
      <View style={styles.streakInfo}>
        <Text style={styles.streakEmoji}>
          {getStreakEmoji(habit.currentStreak)}
        </Text>
        <View style={styles.streakTextContainer}>
          <Text style={[styles.streakCount, { color: colors.primaryText }]}>
            {habit.currentStreak} day{habit.currentStreak !== 1 ? "s" : ""}
          </Text>
          <Text style={[styles.streakLabel, { color: colors.secondaryText }]}>
            current streak
          </Text>
        </View>
      </View>

      {habit.longestStreak > habit.currentStreak && (
        <View style={styles.longestStreak}>
          <Text style={[styles.longestLabel, { color: colors.secondaryText }]}>
            Longest: {habit.longestStreak} days
          </Text>
        </View>
      )}

      <View
        style={[
          styles.statusIndicator,
          { backgroundColor: colors.background, borderColor: colors.border },
          isCompletedToday && [
            styles.completedStatus,
            {
              backgroundColor: isDarkMode ? "#1A3A1A" : "#E8F5E8",
              borderColor: colors.success,
            },
          ],
        ]}
      >
        <Text
          style={[
            styles.statusText,
            { color: colors.secondaryText },
            isCompletedToday && [
              styles.completedStatusText,
              { color: colors.success },
            ],
          ]}
        >
          {isCompletedToday ? "Completed Today" : "Not Completed Today"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  streakInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  streakEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  streakTextContainer: {
    flex: 1,
  },
  streakCount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  streakLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  longestStreak: {
    marginBottom: 8,
  },
  longestLabel: {
    fontSize: 12,
    fontStyle: "italic",
  },
  statusIndicator: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  completedStatus: {
    // Styling applied dynamically
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  completedStatusText: {
    // Color applied dynamically
  },
});

export default StreakStatus;
