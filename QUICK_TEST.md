# Quick Test Guide - Habit Streak App

## 🚀 Quick Start Testing

### Step 1: Set Up Test Mode

1. Open `src/utils/dateUtils.ts`
2. Find the `getToday()` function
3. Comment out the real date line and uncomment a test date:

```typescript
export const getToday = (): string => {
  // Comment out this line:
  // return formatDate(new Date());

  // Uncomment this line for testing:
  return "2024-01-01"; // Day 1
};
```

### Step 2: Test the App

1. Run the app: `npm start`
2. You'll see a yellow banner showing "Test Date: 2024-01-01"
3. Add a habit (e.g., "Drink Water")
4. Mark it as completed
5. **Expected**: Should show "1 day streak" 🔥

### Step 3: Test Day 2

1. Change the date in `dateUtils.ts` to `'2024-01-02'`
2. Press 'r' in the terminal to reload
3. Mark the habit as completed again
4. **Expected**: Should show "2 days streak" 🔥

### Step 4: Test Day 3

1. Change the date to `'2024-01-03'`
2. Press 'r' to reload
3. Mark the habit as completed
4. **Expected**: Should show "3 days streak" 🔥🔥

### Step 5: Test Streak Break

1. Change the date to `'2024-01-05'` (skip day 4)
2. Press 'r' to reload
3. Mark the habit as completed
4. **Expected**: Should show "1 day streak" 🔥 (streak broke)

## 🎯 Test Scenarios

### Scenario 1: Building a Long Streak

```typescript
// Test dates to use:
return "2024-01-01"; // Day 1
return "2024-01-02"; // Day 2
return "2024-01-03"; // Day 3
return "2024-01-04"; // Day 4
return "2024-01-05"; // Day 5
return "2024-01-06"; // Day 6
return "2024-01-07"; // Day 7 - Should show 🔥🔥🔥
```

### Scenario 2: Breaking and Rebuilding

```typescript
// Test dates to use:
return "2024-01-01"; // Day 1
return "2024-01-02"; // Day 2
return "2024-01-03"; // Day 3
return "2024-01-05"; // Day 5 (skip day 4) - Streak breaks
return "2024-01-06"; // Day 6 - Should show 🔥 (1 day)
return "2024-01-07"; // Day 7 - Should show 🔥🔥 (2 days)
```

### Scenario 3: Multiple Habits

1. Add "Drink Water" and "Exercise" habits
2. Test both habits with the same date progression
3. Verify each habit tracks its own streak independently

## 🔧 Troubleshooting

### If streaks aren't updating:

1. Make sure you're changing the date in `getToday()`
2. Press 'r' in terminal to reload the app
3. Check the yellow banner shows the correct test date
4. Verify the habit is marked as completed

### If the app crashes:

1. Check the console for error messages
2. Make sure the date format is 'YYYY-MM-DD'
3. Try restarting the development server

## 📱 Expected Visual Feedback

- **Yellow banner**: Shows current test date
- **Green background**: Habit completed today
- **Checkmark**: Habit completed today
- **Strikethrough text**: Habit completed today
- **Emoji progression**: 😴 → 🔥 → 🔥🔥 → 🔥🔥🔥 → etc.

## 🎉 Success Indicators

✅ **Streak builds correctly**: 1 → 2 → 3 → 4 days
✅ **Streak breaks correctly**: Skip a day, resets to 1
✅ **Emojis change**: Different emojis for different streak levels
✅ **Data persists**: Close/reopen app, streaks remain
✅ **Multiple habits**: Each habit tracks independently

## 🧹 Clean Up

After testing, remember to:

1. Remove the `TestDateDisplay` component from `src/App.tsx`
2. Reset `getToday()` to use real dates
3. Remove the test component file if desired

This testing approach lets you verify the streak functionality in minutes instead of waiting for actual days!
