import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Habit } from "../types";
import { getToday, formatDate } from "../utils/dateUtils";

interface StreakCalendarProps {
  habit: Habit;
  onDayPress?: (date: string) => void;
}

const StreakCalendar: React.FC<StreakCalendarProps> = ({
  habit,
  onDayPress,
}) => {
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
      return [styles.day, styles.completedDay];
    } else if (isToday(date)) {
      return [styles.day, styles.today];
    } else {
      return [styles.day, styles.emptyDay];
    }
  };

  const getDayTextStyle = (date: string) => {
    if (isCompleted(date)) {
      return styles.completedDayText;
    } else if (isToday(date)) {
      return styles.todayText;
    } else {
      return styles.emptyDayText;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last 7 Days</Text>
      <View style={styles.calendar}>
        {/* Day names */}
        <View style={styles.dayNamesRow}>
          {dayNames.map((dayName, index) => (
            <Text key={index} style={styles.dayName}>
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
                  <View style={styles.checkmark}>
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
    color: "#333",
    marginBottom: 8,
  },
  calendar: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    shadowColor: "#000",
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
    color: "#666",
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
    backgroundColor: "#4CAF50",
  },
  today: {
    backgroundColor: "#FF9800",
    borderWidth: 2,
    borderColor: "#F57C00",
  },
  emptyDay: {
    backgroundColor: "#F5F5F5",
  },
  completedDayText: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },
  todayText: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },
  emptyDayText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#999",
  },
  checkmark: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#2E7D32",
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
