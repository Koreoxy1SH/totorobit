export const formatDate = (date: Date): string => {
  // Get local date in YYYY-MM-DD
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getToday = (): string => {
  // For testing: you can modify this to simulate different dates
  // Comment out the line below and uncomment one of the test dates
  return formatDate(new Date());

  // Test dates - uncomment one of these to simulate different days:
  // return "2025-07-13"; // Day 1
  // return "2025-07-14"; // Day 2
  // return "2025-07-15"; // Day 3
  // return "2025-07-16"; // Day 5 (skip day 4 to test streak break)
  // return '2025-07-17'; // Day 10
};

export const isToday = (dateString: string): boolean => {
  return dateString === getToday();
};

export const isYesterday = (dateString: string): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateString === formatDate(yesterday);
};

export const calculateStreak = (completedDates: string[]): number => {
  if (completedDates.length === 0) return 0;

  const sortedDates = completedDates.sort().reverse();
  const today = getToday();

  // If today is completed, start from today
  let currentDate = sortedDates[0];
  let streak = 0;

  for (let i = 0; i < sortedDates.length; i++) {
    const date = sortedDates[i];

    if (i === 0) {
      // First date
      if (date === today || isYesterday(date)) {
        streak = 1;
        currentDate = date;
      } else {
        break;
      }
    } else {
      // Check if this date is consecutive
      const expectedDate = new Date(currentDate);
      expectedDate.setDate(expectedDate.getDate() - 1);
      const expectedDateString = formatDate(expectedDate);

      if (date === expectedDateString) {
        streak++;
        currentDate = date;
      } else {
        break;
      }
    }
  }

  return streak;
};

export const getStreakEmoji = (streak: number): string => {
  if (streak === 0) return "😴";
  if (streak < 3) return "🔥";
  if (streak < 7) return "🔥🔥";
  if (streak < 14) return "🔥🔥🔥";
  if (streak < 30) return "🔥🔥🔥🔥";
  if (streak < 100) return "🔥🔥🔥🔥🔥";
  return "👑";
};

// Test helper function to simulate date changes
export const getTestDate = (daysFromNow: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return formatDate(date);
};
