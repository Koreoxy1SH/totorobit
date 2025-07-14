"use client";

import type React from "react";
import { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Animated,
  TextInput,
  Modal as RNModal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Habit } from "../types";
import { useTheme } from "../context/ThemeContext";
import { formatDate } from "../utils/dateUtils";

function getMonthDays(year: number, month: number) {
  const days: { date: string; dayOfWeek: number; day: number }[] = [];
  const lastDay = new Date(year, month + 1, 0);
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const dateObj = new Date(year, month, d);
    days.push({
      date: formatDate(dateObj),
      dayOfWeek: dateObj.getDay(),
      day: d,
    });
  }
  return days;
}

function getLast12Months() {
  const months: { year: number; month: number }[] = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.unshift({ year: date.getFullYear(), month: date.getMonth() });
  }
  return months;
}

const HabitDetailsScreen: React.FC<{
  habit: Habit;
  onClose: () => void;
  onUpdateHabit: (updatedHabit: Habit) => void;
}> = ({ habit, onClose, onUpdateHabit }) => {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editName, setEditName] = useState(habit.name);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const months = getLast12Months();
  const currentMonth = months[months.length - 1];
  const prevMonths = months.slice(0, 11);

  const isCompleted = (date: string) => habit.completedDates.includes(date);

  // Helper to format creation date
  const formatCreatedAt = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const currentMonthLabel = new Date(
    currentMonth.year,
    currentMonth.month
  ).toLocaleString("default", { month: "long", year: "numeric" });

  // --- Current Month Calendar ---
  const currentMonthDays = getMonthDays(currentMonth.year, currentMonth.month);
  const firstDayOfWeek = currentMonthDays[0].dayOfWeek;
  const currentMonthWeeks: Array<
    Array<{ date: string; dayOfWeek: number; day: number } | null>
  > = [];
  let week: Array<{ date: string; dayOfWeek: number; day: number } | null> =
    new Array(7).fill(null);
  for (let i = 0; i < firstDayOfWeek; i++) week[i] = null;
  currentMonthDays.forEach((day) => {
    if (week.filter(Boolean).length === 7) {
      currentMonthWeeks.push(week);
      week = new Array(7).fill(null);
    }
    week[day.dayOfWeek] = day;
    if (day.dayOfWeek === 6) {
      currentMonthWeeks.push(week);
      week = new Array(7).fill(null);
    }
  });
  if (week.some(Boolean)) currentMonthWeeks.push(week);

  // --- Previous 11 Months GitHub-style ---
  const getMonthLabel = (year: number, month: number) =>
    new Date(year, month).toLocaleString("default", {
      month: "short",
      year: "2-digit",
    });

  // For each previous month, build a grid of weeks (GitHub style)
  const prevMonthGrids = prevMonths.map(({ year, month }) => {
    const days = getMonthDays(year, month);
    const firstDay = days[0].dayOfWeek;
    const weeks: Array<
      Array<{ date: string; dayOfWeek: number; day: number } | null>
    > = [];
    let week: Array<{ date: string; dayOfWeek: number; day: number } | null> =
      new Array(7).fill(null);
    for (let i = 0; i < firstDay; i++) week[i] = null;
    days.forEach((day) => {
      if (week.filter(Boolean).length === 7) {
        weeks.push(week);
        week = new Array(7).fill(null);
      }
      week[day.dayOfWeek] = day;
      if (day.dayOfWeek === 6) {
        weeks.push(week);
        week = new Array(7).fill(null);
      }
    });
    if (week.some(Boolean)) weeks.push(week);
    // Highlight if any day in this month is completed
    const hasStreak = days.some((d) => isCompleted(d.date));
    return { year, month, label: getMonthLabel(year, month), weeks, hasStreak };
  });

  // --- Stats ---
  const yearDays = months
    .map(({ year, month }) => getMonthDays(year, month))
    .flat();
  const completedDays = habit.completedDates.filter((date) =>
    yearDays.some((d) => d.date === date)
  ).length;
  const totalDays = yearDays.length;
  const completionRate = Math.round((completedDays / totalDays) * 100);

  return (
    <>
      <RNModal
        visible={editModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.25)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 18,
              padding: 24,
              width: "85%",
              maxWidth: 340,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.18,
              shadowRadius: 16,
              elevation: 12,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: colors.primaryText,
                marginBottom: 12,
              }}
            >
              Edit Habit Name
            </Text>
            <TextInput
              value={editName}
              onChangeText={setEditName}
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: colors.primaryText,
                backgroundColor: colors.background,
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: colors.border,
                paddingHorizontal: 14,
                paddingVertical: 10,
                width: "100%",
                marginBottom: 18,
              }}
              autoFocus
              placeholder="Habit name"
              placeholderTextColor={colors.secondaryText}
              maxLength={40}
            />
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => setEditModalVisible(false)}
                style={{
                  flex: 1,
                  borderColor: colors.border,
                  borderWidth: 1.5,
                  borderRadius: 8,
                  paddingVertical: 12,
                  backgroundColor: colors.background,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: colors.secondaryText,
                    fontWeight: "700",
                    fontSize: 15,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (editName.trim() && editName !== habit.name) {
                    onUpdateHabit({ ...habit, name: editName.trim() });
                  }
                  setEditModalVisible(false);
                }}
                style={{
                  flex: 1,
                  backgroundColor: colors.primary,
                  borderRadius: 8,
                  paddingVertical: 12,
                  alignItems: "center",
                  shadowColor: colors.shadow,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <Text
                  style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RNModal>
      <Modal visible animationType="none" transparent onRequestClose={onClose}>
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.modal,
              {
                backgroundColor: colors.background,
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={24} color={colors.secondaryText} />
              </TouchableOpacity>
            </View>

            {/* Title and Edit Button */}
            <View style={{ alignItems: "center", marginBottom: 4 }}>
              <Text
                style={[styles.title, { color: colors.primaryText }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {habit.name}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setEditName(habit.name);
                  setEditModalVisible(true);
                }}
                style={{
                  backgroundColor:
                    colors.background === "#121212"
                      ? colors.surface
                      : "#f5f5f5",
                  borderRadius: 8,
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  borderWidth: 1,
                  borderColor: colors.border,
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: colors.shadow,
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.04,
                  shadowRadius: 2,
                  elevation: 1,
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    color: colors.primary,
                    fontWeight: "700",
                    fontSize: 15,
                  }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
            {/* Subtitle: creation date */}
            <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
              Started: {formatCreatedAt(habit.createdAt)}
            </Text>

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Ionicons name="flame" size={18} color={colors.success} />
                <Text style={[styles.statValue, { color: colors.success }]}>
                  {habit.currentStreak}
                </Text>
                <Text
                  style={[styles.statLabel, { color: colors.secondaryText }]}
                >
                  streak
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="trophy" size={18} color={colors.accentText} />
                <Text style={[styles.statValue, { color: colors.accentText }]}>
                  {habit.longestStreak}
                </Text>
                <Text
                  style={[styles.statLabel, { color: colors.secondaryText }]}
                >
                  best
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color={colors.primaryText}
                />
                <Text style={[styles.statValue, { color: colors.primaryText }]}>
                  {completionRate}%
                </Text>
                <Text
                  style={[styles.statLabel, { color: colors.secondaryText }]}
                >
                  rate
                </Text>
              </View>
            </View>

            {/* Current Month Calendar */}
            <View style={styles.currentMonthSection}>
              <Text
                style={[styles.sectionTitle, { color: colors.primaryText }]}
              >
                {currentMonthLabel}
              </Text>
              <View
                style={[
                  styles.currentMonthCalendar,
                  {
                    backgroundColor:
                      colors.background === "#121212" ? "#23272f" : "#f8f9fa",
                  },
                ]}
              >
                {/* Day names */}
                <View style={styles.currentMonthDayNamesRow}>
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (d) => (
                      <Text
                        key={d}
                        style={[
                          styles.currentMonthDayName,
                          { color: colors.secondaryText },
                        ]}
                      >
                        {d}
                      </Text>
                    )
                  )}
                </View>
                {/* Calendar weeks */}
                {currentMonthWeeks.map((week, i) => (
                  <View key={i} style={styles.currentMonthWeekRow}>
                    {week.map((day, j) => (
                      <View key={j} style={styles.currentMonthDayCell}>
                        {day ? (
                          <View
                            style={[
                              styles.currentMonthDaySquare,
                              {
                                backgroundColor: isCompleted(day.date)
                                  ? colors.success
                                  : colors.border,
                              },
                            ]}
                          >
                            <Text
                              style={[
                                styles.currentMonthDayText,
                                {
                                  color: isCompleted(day.date)
                                    ? "#fff"
                                    : colors.secondaryText,
                                },
                              ]}
                            >
                              {day.day}
                            </Text>
                          </View>
                        ) : (
                          <View style={styles.currentMonthDaySquare} />
                        )}
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </View>

            {/* Previous 11 Months GitHub-style */}
            <View style={styles.yearSection}>
              <Text
                style={[styles.sectionTitle, { color: colors.primaryText }]}
              >
                Year Overview
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.yearScrollContainer}
              >
                {prevMonthGrids.map((month, idx) => (
                  <View key={month.label} style={styles.yearMonthBlock}>
                    <Text
                      style={[
                        styles.yearMonthLabel,
                        month.hasStreak
                          ? [
                              styles.yearMonthLabelHighlight,
                              {
                                backgroundColor: colors.success,
                                color: "#fff",
                                // For dark mode, use a lighter background and dark text
                                ...(colors.background === "#121212" && {
                                  backgroundColor: colors.accentText,
                                  color: colors.background,
                                }),
                              },
                            ]
                          : { color: colors.secondaryText },
                      ]}
                    >
                      {month.label}
                    </Text>
                    <View
                      style={[
                        styles.yearMonthCalendar,
                        {
                          backgroundColor:
                            colors.background === "#121212"
                              ? "#23272f"
                              : "#f8f9fa",
                        },
                      ]}
                    >
                      {month.weeks.map((week, i) => (
                        <View key={i} style={styles.yearMonthWeekRow}>
                          {week.map((day, j) => (
                            <View key={j} style={styles.yearMonthDayCell}>
                              {day ? (
                                <View
                                  style={[
                                    styles.yearMonthDaySquare,
                                    {
                                      backgroundColor: isCompleted(day.date)
                                        ? colors.success
                                        : colors.border,
                                    },
                                  ]}
                                />
                              ) : (
                                <View style={styles.yearMonthDaySquare} />
                              )}
                            </View>
                          ))}
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    padding: 0,
    width: "100%",
    maxWidth: 600,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
    paddingBottom: 0,
  },
  closeButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 2,
    opacity: 0.8,
  },
  statDivider: {
    width: 1,
    height: 35,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginHorizontal: 16,
  },
  currentMonthSection: {
    marginBottom: 28,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
    opacity: 0.8,
  },
  currentMonthCalendar: {
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  currentMonthDayNamesRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  currentMonthDayName: {
    flex: 1,
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
    opacity: 0.7,
  },
  currentMonthWeekRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  currentMonthDayCell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 1,
  },
  currentMonthDaySquare: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  currentMonthDayText: {
    fontSize: 13,
    fontWeight: "600",
  },
  yearSection: {
    paddingHorizontal: 16,
    marginBottom: 18,
  },
  yearScrollContainer: {
    alignItems: "flex-end",
    paddingBottom: 8,
  },
  yearMonthBlock: {
    marginRight: 18,
    alignItems: "center",
  },
  yearMonthLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
    opacity: 0.7,
  },
  yearMonthLabelHighlight: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontWeight: "700",
    fontSize: 12,
    marginBottom: 4,
    marginTop: 0,
    alignSelf: "center",
    overflow: "hidden",
  },
  yearMonthCalendar: {
    flexDirection: "column",
    borderRadius: 8,
    padding: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  yearMonthWeekRow: {
    flexDirection: "row",
  },
  yearMonthDayCell: {
    width: 13,
    height: 13,
    alignItems: "center",
    justifyContent: "center",
    margin: 1,
  },
  yearMonthDaySquare: {
    width: 11,
    height: 11,
    borderRadius: 3,
  },
});

export default HabitDetailsScreen;
