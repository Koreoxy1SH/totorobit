import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HabitCard from "./components/HabitCard";
import AddHabitModal from "./components/AddHabitModal";
import EmptyState from "./components/EmptyState";
import TestDateDisplay from "./components/TestDateDisplay";
import BottomTabBar from "./components/BottomTabBar";
import StatsScreen from "./components/StatsScreen";
import SettingsScreen from "./components/SettingsScreen";
import { Habit, HabitFormData } from "./types";
import { calculateStreak, getToday } from "./utils/dateUtils";
import {
  loadHabits,
  addHabit,
  updateHabit,
  deleteHabit,
  saveHabits,
} from "./utils/storage";

const HabitStreakApp: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("habits");

  useEffect(() => {
    loadHabitsFromStorage();
  }, []);

  const loadHabitsFromStorage = async () => {
    try {
      const loadedHabits = await loadHabits();
      setHabits(loadedHabits);
    } catch (error) {
      console.error("Error loading habits:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHabit = async (habitData: HabitFormData) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: habitData.name,
      createdAt: getToday(),
      completedDates: [],
      currentStreak: 0,
      longestStreak: 0,
    };

    try {
      await addHabit(newHabit);
      setHabits((prev) => [...prev, newHabit]);
    } catch (error) {
      console.error("Error adding habit:", error);
    }
  };

  const handleToggleComplete = async (habit: Habit) => {
    const today = getToday();
    const isCompletedToday = habit.completedDates.includes(today);

    let updatedCompletedDates: string[];

    if (isCompletedToday) {
      // Remove today from completed dates
      updatedCompletedDates = habit.completedDates.filter(
        (date) => date !== today
      );
    } else {
      // Add today to completed dates
      updatedCompletedDates = [...habit.completedDates, today];
    }

    const currentStreak = calculateStreak(updatedCompletedDates);
    const longestStreak = Math.max(habit.longestStreak, currentStreak);

    const updatedHabit: Habit = {
      ...habit,
      completedDates: updatedCompletedDates,
      currentStreak,
      longestStreak,
    };

    try {
      await updateHabit(updatedHabit);
      setHabits((prev) =>
        prev.map((h) => (h.id === habit.id ? updatedHabit : h))
      );
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  const handleDeleteHabit = async (habitId: string) => {
    try {
      await deleteHabit(habitId);
      setHabits((prev) => prev.filter((h) => h.id !== habitId));
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  const handleClearAllData = () => {
    Alert.alert(
      "Clear All Data",
      "Are you sure you want to delete all habits and progress? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: async () => {
            try {
              await saveHabits([]);
              setHabits([]);
            } catch (error) {
              console.error("Error clearing data:", error);
            }
          },
        },
      ]
    );
  };

  const getTotalStreak = (): number => {
    return habits.reduce((total, habit) => total + habit.currentStreak, 0);
  };

  const getCompletedToday = (): number => {
    const today = getToday();
    return habits.filter((habit) => habit.completedDates.includes(today))
      .length;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "habits":
        return (
          <>
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>Habit Streak</Text>
                <Text style={styles.subtitle}>
                  {getCompletedToday()} of {habits.length} habits completed
                  today
                </Text>
              </View>
              <View style={styles.statsContainer}>
                <Text style={styles.statsText}>
                  🔥 {getTotalStreak()} total streak
                </Text>
              </View>
            </View>

            <TestDateDisplay />

            {habits.length === 0 ? (
              <EmptyState />
            ) : (
              <FlatList
                data={habits}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <HabitCard
                    habit={item}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDeleteHabit}
                  />
                )}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
              />
            )}

            <TouchableOpacity
              style={styles.fab}
              onPress={() => setModalVisible(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </>
        );
      case "stats":
        return <StatsScreen habits={habits} />;
      case "settings":
        return <SettingsScreen onClearData={handleClearAllData} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{renderContent()}</View>

      <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />

      <AddHabitModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddHabit={handleAddHabit}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  statsContainer: {
    marginTop: 8,
  },
  statsText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50",
  },
  listContainer: {
    paddingVertical: 8,
  },
  fab: {
    position: "absolute",
    bottom: 100, // Adjusted for bottom tab bar
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default HabitStreakApp;
