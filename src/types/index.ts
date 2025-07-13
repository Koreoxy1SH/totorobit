export interface Habit {
  id: string;
  name: string;
  createdAt: string;
  completedDates: string[];
  currentStreak: number;
  longestStreak: number;
}

export interface HabitFormData {
  name: string;
}
