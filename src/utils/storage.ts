import * as SecureStore from "expo-secure-store";
import { Habit } from "../types";

const HABITS_KEY = "habits";

export const saveHabits = async (habits: Habit[]): Promise<void> => {
  try {
    await SecureStore.setItemAsync(HABITS_KEY, JSON.stringify(habits));
  } catch (error) {
    console.error("Error saving habits:", error);
  }
};

export const loadHabits = async (): Promise<Habit[]> => {
  try {
    const habitsJson = await SecureStore.getItemAsync(HABITS_KEY);
    if (habitsJson) {
      return JSON.parse(habitsJson);
    }
  } catch (error) {
    console.error("Error loading habits:", error);
  }
  return [];
};

export const addHabit = async (habit: Habit): Promise<void> => {
  const habits = await loadHabits();
  habits.push(habit);
  await saveHabits(habits);
};

export const updateHabit = async (updatedHabit: Habit): Promise<void> => {
  const habits = await loadHabits();
  const index = habits.findIndex((habit) => habit.id === updatedHabit.id);
  if (index !== -1) {
    habits[index] = updatedHabit;
    await saveHabits(habits);
  }
};

export const deleteHabit = async (habitId: string): Promise<void> => {
  const habits = await loadHabits();
  const filteredHabits = habits.filter((habit) => habit.id !== habitId);
  await saveHabits(filteredHabits);
};
