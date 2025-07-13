import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Habit } from "../types";
import { getStreakEmoji } from "../utils/dateUtils";

interface StreakStatusProps {
  habit: Habit;
}

const StreakStatus: React.FC<StreakStatusProps> = ({ habit }) => {
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
          <Text style={styles.streakCount}>
            {habit.currentStreak} day{habit.currentStreak !== 1 ? "s" : ""}
          </Text>
          <Text style={styles.streakLabel}>current streak</Text>
        </View>
      </View>

      {habit.longestStreak > habit.currentStreak && (
        <View style={styles.longestStreak}>
          <Text style={styles.longestLabel}>
            Longest: {habit.longestStreak} days
          </Text>
        </View>
      )}

      <View
        style={[
          styles.statusIndicator,
          isCompletedToday && styles.completedStatus,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            isCompletedToday && styles.completedStatusText,
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
    color: "#333",
  },
  streakLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  longestStreak: {
    marginBottom: 8,
  },
  longestLabel: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
  statusIndicator: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  completedStatus: {
    backgroundColor: "#E8F5E8",
    borderColor: "#4CAF50",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
  },
  completedStatusText: {
    color: "#2E7D32",
  },
});

export default StreakStatus;
