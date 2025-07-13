import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Habit } from "../types";
import { getToday, formatDate } from "../utils/dateUtils";
import { useTheme } from "../context/ThemeContext";

interface StreakCalendarProps {
  habit: Habit;
  onDayPress?: (date: string) => void;
}

const StreakCalendar: React.FC<StreakCalendarProps> = ({
  habit,
  onDayPress,
}) => {
  const { colors } = useTheme();
  const today = getToday();
  const currentDate = new Date();

  // Generate last 7 days
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      days.push(formatDate(date));
    }
    return days;
  };

  const last7Days = getLast7Days();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const isCompleted = (date: string) => {
    return habit.completedDates.includes(date);
  };

  const isToday = (date: string) => {
    return date === today;
  };

  const getDayStyle = (date: string) => {
    if (isCompleted(date)) {
      return [
        styles.day,
        styles.completedDay,
        { backgroundColor: colors.success },
      ];
    } else if (isToday(date)) {
      return [
        styles.day,
        styles.today,
        { backgroundColor: colors.warning, borderColor: colors.warning },
      ];
    } else {
      return [
        styles.day,
        styles.emptyDay,
        { backgroundColor: colors.background },
      ];
    }
  };

  const getDayTextStyle = (date: string) => {
    if (isCompleted(date)) {
      return [styles.completedDayText, { color: "white" }];
    } else if (isToday(date)) {
      return [styles.todayText, { color: "white" }];
    } else {
      return [styles.emptyDayText, { color: colors.secondaryText }];
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.primaryText }]}>
        Last 7 Days
      </Text>
      <View
        style={[
          styles.calendar,
          { backgroundColor: colors.card, shadowColor: colors.shadow },
        ]}
      >
        {/* Day names */}
        <View style={styles.dayNamesRow}>
          {dayNames.map((dayName, index) => (
            <Text
              key={index}
              style={[styles.dayName, { color: colors.secondaryText }]}
            >
              {dayName}
            </Text>
          ))}
        </View>

        {/* Calendar days */}
        <View style={styles.daysRow}>
          {last7Days.map((date, index) => {
            const dayNumber = new Date(date).getDate();
            return (
              <TouchableOpacity
                key={index}
                style={getDayStyle(date)}
                onPress={() => onDayPress?.(date)}
                disabled={!onDayPress}
              >
                <Text style={getDayTextStyle(date)}>{dayNumber}</Text>
                {isCompleted(date) && (
                  <View
                    style={[
                      styles.checkmark,
                      { backgroundColor: colors.primaryDark },
                    ]}
                  >
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  calendar: {
    borderRadius: 8,
    padding: 12,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dayNamesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  dayName: {
    fontSize: 12,
    fontWeight: "500",
    width: 32,
    textAlign: "center",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  day: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  completedDay: {
    // Background color applied dynamically
  },
  today: {
    borderWidth: 2,
    // Background and border colors applied dynamically
  },
  emptyDay: {
    // Background color applied dynamically
  },
  completedDayText: {
    fontSize: 12,
    fontWeight: "600",
    // Color applied dynamically
  },
  todayText: {
    fontSize: 12,
    fontWeight: "600",
    // Color applied dynamically
  },
  emptyDayText: {
    fontSize: 12,
    fontWeight: "500",
    // Color applied dynamically
  },
  checkmark: {
    position: "absolute",
    top: -2,
    right: -2,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    fontSize: 8,
    color: "white",
    fontWeight: "bold",
  },
});

export default StreakCalendar;
