import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";
import { Habit } from "../types";

// Export data to JSON file
export const exportHabitsData = async (habits: Habit[]): Promise<void> => {
  try {
    // Create export data with metadata
    const exportData = {
      version: "1.0.0",
      exportDate: new Date().toISOString(),
      habits: habits,
      totalHabits: habits.length,
      totalStreak: habits.reduce(
        (total, habit) => total + habit.currentStreak,
        0
      ),
    };

    // Convert to JSON string
    const jsonData = JSON.stringify(exportData, null, 2);

    // Create filename with timestamp
    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `habit-streak-backup-${timestamp}.json`;

    // Get the app's documents directory
    const fileUri = `${FileSystem.documentDirectory}${filename}`;

    // Write the file
    await FileSystem.writeAsStringAsync(fileUri, jsonData, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    // Check if sharing is available
    const isAvailable = await Sharing.isAvailableAsync();

    if (isAvailable) {
      // Share the file
      await Sharing.shareAsync(fileUri, {
        mimeType: "application/json",
        dialogTitle: "Export Habit Data",
        UTI: "public.json",
      });
    } else {
      // Fallback: copy to downloads or show file path
      console.log("Sharing not available. File saved to:", fileUri);
    }

    return Promise.resolve();
  } catch (error) {
    console.error("Error exporting data:", error);
    throw new Error("Failed to export data");
  }
};

// Import data from JSON file
export const importHabitsData = async (): Promise<Habit[]> => {
  try {
    // Pick a JSON file
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/json",
      copyToCacheDirectory: true,
    });

    if (result.canceled) {
      throw new Error("Import cancelled");
    }

    const { uri } = result.assets[0];

    // Read the file content
    const fileContent = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    // Parse JSON data
    const importData = JSON.parse(fileContent);

    // Validate the import data structure
    if (!importData.habits || !Array.isArray(importData.habits)) {
      throw new Error("Invalid file format: habits array not found");
    }

    // Validate each habit object
    const validatedHabits: Habit[] = importData.habits.map(
      (habit: any, index: number) => {
        if (!habit.id || !habit.name || !habit.createdAt) {
          throw new Error(`Invalid habit data at index ${index}`);
        }

        return {
          id: habit.id,
          name: habit.name,
          createdAt: habit.createdAt,
          completedDates: Array.isArray(habit.completedDates)
            ? habit.completedDates
            : [],
          currentStreak:
            typeof habit.currentStreak === "number" ? habit.currentStreak : 0,
          longestStreak:
            typeof habit.longestStreak === "number" ? habit.longestStreak : 0,
        };
      }
    );

    return validatedHabits;
  } catch (error) {
    console.error("Error importing data:", error);
    throw error;
  }
};

// Get file info for display
export const getFileInfo = async (
  uri: string
): Promise<{ size: string; date: string }> => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(uri);

    if (!fileInfo.exists) {
      throw new Error("File not found");
    }

    const sizeInBytes = fileInfo.size || 0;
    const sizeInKB = (sizeInBytes / 1024).toFixed(1);

    const date = new Date(
      fileInfo.modificationTime || Date.now()
    ).toLocaleDateString();

    return {
      size: `${sizeInKB} KB`,
      date: date,
    };
  } catch (error) {
    console.error("Error getting file info:", error);
    return {
      size: "Unknown",
      date: "Unknown",
    };
  }
};

// Validate import data structure
export const validateImportData = (data: any): boolean => {
  try {
    // Check if data has required properties
    if (!data || typeof data !== "object") {
      return false;
    }

    // Check if habits array exists
    if (!Array.isArray(data.habits)) {
      return false;
    }

    // Validate each habit
    for (const habit of data.habits) {
      if (!habit.id || !habit.name || !habit.createdAt) {
        return false;
      }
    }

    return true;
  } catch (error) {
    return false;
  }
};
