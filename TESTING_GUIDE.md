# Habit Streak App - Testing Guide

## 🧪 How to Test Streak Functionality

This guide shows you how to test the streak functionality without waiting for actual days to pass.

## Method 1: Date Simulation (Recommended)

### Step 1: Set Up Test Mode

1. Open `src/utils/dateUtils.ts`
2. Find the `getToday()` function
3. Comment out the current date line and uncomment a test date:

```typescript
export const getToday = (): string => {
  // Comment out this line:
  // return formatDate(new Date());

  // Uncomment one of these test dates:
  return "2024-01-01"; // Day 1
  // return '2024-01-02'; // Day 2
  // return '2024-01-03'; // Day 3
  // return '2024-01-05'; // Day 5 (skip day 4 to test streak break)
  // return '2024-01-10'; // Day 10
};
```

### Step 2: Test Scenarios

#### Scenario A: Building a Streak

1. Set date to `'2024-01-01'`
2. Add a habit (e.g., "Drink Water")
3. Mark it as completed
4. Change date to `'2024-01-02'`
5. Mark it as completed again
6. Change date to `'2024-01-03'`
7. Mark it as completed
8. **Result**: Should show "3 days streak" 🔥🔥

#### Scenario B: Breaking a Streak

1. Set date to `'2024-01-01'`
2. Add a habit and mark it complete
3. Set date to `'2024-01-02'`
4. Mark it complete
5. Set date to `'2024-01-03'`
6. Mark it complete
7. Set date to `'2024-01-05'` (skip day 4)
8. Mark it complete
9. **Result**: Should show "1 day streak" 🔥 (streak broke)

#### Scenario C: Long Streak

1. Set date to `'2024-01-01'`
2. Add a habit and mark it complete
3. Set date to `'2024-01-02'` and mark complete
4. Set date to `'2024-01-03'` and mark complete
5. Set date to `'2024-01-04'` and mark complete
6. Set date to `'2024-01-05'` and mark complete
7. Set date to `'2024-01-06'` and mark complete
8. Set date to `'2024-01-07'` and mark complete
9. **Result**: Should show "7 days streak" 🔥🔥🔥

## Method 2: Using Test Helper Function

You can also use the `getTestDate()` function for more dynamic testing:

```typescript
// In getToday() function:
return getTestDate(0); // Today
return getTestDate(1); // Tomorrow
return getTestDate(2); // Day after tomorrow
return getTestDate(-1); // Yesterday
```

## Method 3: Real-Time Testing

### Daily Testing Process

1. **Day 1**: Add habits and mark them complete
2. **Day 2**: Open app, mark habits complete again
3. **Day 3**: Continue marking habits complete
4. **Skip a day**: Don't mark habits on day 4
5. **Day 5**: Mark habits complete - streak should reset to 1

### Testing Checklist

- [ ] **Streak Building**: Mark habits for 3+ consecutive days
- [ ] **Streak Breaking**: Skip a day, then mark again
- [ ] **Emoji Progression**: Test different streak levels (1, 3, 7, 14, 30+ days)
- [ ] **Multiple Habits**: Test with 2-3 different habits
- [ ] **Data Persistence**: Close and reopen app, verify streaks remain
- [ ] **Unmarking**: Mark a habit complete, then unmark it
- [ ] **Delete Habit**: Add a habit, mark it complete, then delete it

## Expected Results

### Streak Levels

- **0 days**: 😴 (no streak)
- **1-2 days**: 🔥
- **3-6 days**: 🔥🔥
- **7-13 days**: 🔥🔥🔥
- **14-29 days**: 🔥🔥🔥🔥
- **30-99 days**: 🔥🔥🔥🔥🔥
- **100+ days**: 👑

### Visual Feedback

- **Completed today**: Green background, checkmark, strikethrough text
- **Not completed**: White background, empty circle
- **Streak counter**: Shows current consecutive days
- **Header**: Shows "X of Y habits completed today"

## Troubleshooting

### Common Issues

1. **Streak not updating**: Make sure you're changing the date in `getToday()`
2. **App not reloading**: Press 'r' in the terminal to reload
3. **Data not persisting**: Check that `expo-secure-store` is working
4. **Wrong date format**: Ensure dates are in 'YYYY-MM-DD' format

### Debug Tips

- Check the console logs for any errors
- Verify the date being used in `getToday()`
- Test with simple dates like '2024-01-01', '2024-01-02', etc.
- Use the Expo debugger (press 'j' in terminal) to inspect state

## Quick Test Script

Here's a quick test you can run:

1. **Set date to '2024-01-01'**
2. Add "Drink Water" habit
3. Mark it complete
4. **Set date to '2024-01-02'**
5. Mark it complete
6. **Set date to '2024-01-03'**
7. Mark it complete
8. **Expected**: 3-day streak with 🔥🔥 emoji

This should take about 2-3 minutes and verify that your streak logic is working correctly!
