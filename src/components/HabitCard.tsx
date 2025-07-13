import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Habit } from "../types";
import { isToday, getStreakEmoji, getToday } from "../utils/dateUtils";
import StreakCalendar from "./StreakCalendar";
import StreakStatus from "./StreakStatus";
import { useTheme } from "../context/ThemeContext";

interface HabitCardProps {
  habit: Habit;
  onToggleComplete: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onToggleComplete,
  onDelete,
}) => {
  const { colors, isDarkMode } = useTheme();
  const isCompletedToday = habit.completedDates.includes(getToday());

  const handleToggle = () => {
    onToggleComplete(habit);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Habit",
      `Are you sure you want to delete "${habit.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete(habit.id),
        },
      ]
    );
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, shadowColor: colors.shadow },
        isCompletedToday && [
          styles.completedCard,
          {
            backgroundColor: isDarkMode ? "#1A3A1A" : "#E8F5E8",
            borderColor: colors.success,
            shadowColor: colors.success,
          },
        ],
      ]}
    >
      <TouchableOpacity
        style={styles.content}
        onPress={handleToggle}
        activeOpacity={0.7}
      >
        <View style={styles.habitInfo}>
          <Text
            style={[
              styles.habitName,
              { color: colors.primaryText },
              isCompletedToday && [
                styles.completedText,
                { color: colors.success },
              ],
            ]}
          >
            {habit.name}
          </Text>
        </View>

        <View style={styles.actions}>
          <View
            style={[
              styles.checkCircle,
              { borderColor: colors.border },
              isCompletedToday && [
                styles.checkedCircle,
                {
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                },
              ],
            ]}
          >
            {isCompletedToday && (
              <Ionicons name="checkmark" size={20} color="white" />
            )}
          </View>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="trash-outline" size={20} color={colors.error} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* Streak Status */}
      <StreakStatus habit={habit} />

      {/* Streak Calendar */}
      <StreakCalendar habit={habit} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  completedCard: {
    borderWidth: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: "line-through",
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  streakText: {
    fontSize: 14,
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkedCircle: {
    // Styling applied dynamically
  },
  deleteButton: {
    padding: 8,
  },
});

export default HabitCard;
