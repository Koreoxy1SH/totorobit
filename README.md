# Habit Streak App


<table border="0">
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/bb64f38e-d6c4-4dcc-9627-8b02142189bf" alt="Habit Streak App" width="300" height="300" />
    </td>
    <td>
      <h3><strong>A simple and intuitive habit tracking app built with React Native and Expo. Track your daily habits and maintain streaks to build lasting positive behaviors.</strong></h3>
    </td>
  </tr>
</table>


## Features

- **Habit Creation**: Add custom habits with meaningful names
- **Daily Tracking**: Mark habits as completed each day with a simple tap
- **Streak Counter**: Track consecutive days of completion for each habit
- **Visual Feedback**: See your progress with emojis and visual indicators
- **Data Persistence**: Your habits and progress are saved locally
- **Clean UI**: Modern, intuitive interface focused on habit completion

## Screenshots

The app features a clean, modern interface with:

- Header showing daily progress and total streak
- Individual habit cards with streak counters
- Floating action button to add new habits
- Modal for creating new habits
- Empty state when no habits are added

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd habit-streak
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Run on your device:
   - Install the Expo Go app on your phone
   - Scan the QR code from the terminal
   - Or press 'a' for Android or 'i' for iOS simulator

## Usage

### Adding a Habit

1. Tap the floating action button (+)
2. Enter a habit name (e.g., "Drink Water", "Exercise", "Read")
3. Tap "Add Habit"

### Tracking Daily Progress

1. Tap on any habit card to mark it as completed for today
2. The streak counter will update automatically
3. Tap again to unmark if needed

### Understanding Streaks

- **Current Streak**: Consecutive days completed (including today)
- **Visual Indicators**:
  - 😴 No streak
  - 🔥 1-2 days
  - 🔥🔥 3-6 days
  - 🔥🔥🔥 7-13 days
  - 🔥🔥🔥🔥 14-29 days
  - 🔥🔥🔥🔥🔥 30-99 days
  - 👑 100+ days

## Technical Details

### Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type safety and better development experience
- **Expo SecureStore**: Local data persistence
- **React Native Gesture Handler**: Touch interactions

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── HabitCard.tsx   # Individual habit display
│   ├── AddHabitModal.tsx # Modal for adding habits
│   └── EmptyState.tsx  # Empty state component
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── dateUtils.ts    # Date and streak calculations
│   └── storage.ts      # Data persistence
└── App.tsx            # Main app component
```

### Data Model

```typescript
interface Habit {
  id: string;
  name: string;
  createdAt: string;
  completedDates: string[];
  currentStreak: number;
  longestStreak: number;
}
```

## Development

### Available Scripts

- `npm start`: Start the Expo development server
- `npm run android`: Run on Android device/emulator
- `npm run ios`: Run on iOS device/simulator
- `npm run web`: Run in web browser

### Key Features Implementation

1. **Streak Calculation**: Smart algorithm that considers consecutive days
2. **Data Persistence**: Uses Expo SecureStore for reliable local storage
3. **Responsive Design**: Works on various screen sizes
4. **Type Safety**: Full TypeScript implementation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Future Enhancements

- Habit categories and tags
- Reminder notifications
- Statistics and analytics
- Dark mode support
- Export/import data
