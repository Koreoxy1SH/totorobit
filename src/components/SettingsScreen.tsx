import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { exportHabitsData, importHabitsData } from "../utils/fileUtils";
import { Habit } from "../types";
import { useTheme } from "../context/ThemeContext";

interface SettingsScreenProps {
  onClearData: () => void;
  habits: Habit[];
  onImportData: (habits: Habit[]) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onClearData,
  habits,
  onImportData,
}) => {
  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const handleExportData = async () => {
    try {
      if (habits.length === 0) {
        Alert.alert("No Data", "There are no habits to export.");
        return;
      }

      await exportHabitsData(habits);
      Alert.alert("Success", "Habit data exported successfully!");
    } catch (error) {
      console.error("Export error:", error);
      Alert.alert("Error", "Failed to export data. Please try again.");
    }
  };

  const handleImportData = async () => {
    try {
      Alert.alert(
        "Import Data",
        "This will replace your current habits. Are you sure?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Import",
            style: "destructive",
            onPress: async () => {
              try {
                const importedHabits = await importHabitsData();
                onImportData(importedHabits);
                Alert.alert("Success", "Habit data imported successfully!");
              } catch (error) {
                console.error("Import error:", error);
                if (
                  error instanceof Error &&
                  error.message === "Import cancelled"
                ) {
                  return;
                }
                Alert.alert(
                  "Error",
                  "Failed to import data. Please check the file format."
                );
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error("Import error:", error);
      Alert.alert("Error", "Failed to import data. Please try again.");
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        <Text style={[styles.title, { color: colors.primaryText }]}>
          Settings
        </Text>
      </View>

      <View
        style={[
          styles.section,
          { backgroundColor: colors.surface, shadowColor: colors.shadow },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.primaryText }]}>
          Preferences
        </Text>

        <View
          style={[styles.settingItem, { borderBottomColor: colors.divider }]}
        >
          <View style={styles.settingInfo}>
            <Ionicons
              name="notifications"
              size={24}
              color={colors.secondaryText}
            />
            <View style={styles.settingText}>
              <Text
                style={[styles.settingLabel, { color: colors.primaryText }]}
              >
                Notifications
              </Text>
              <Text
                style={[
                  styles.settingDescription,
                  { color: colors.secondaryText },
                ]}
              >
                Daily reminders for habits
              </Text>
            </View>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={
              notificationsEnabled ? colors.primaryDark : colors.surface
            }
          />
        </View>

        <View
          style={[styles.settingItem, { borderBottomColor: colors.divider }]}
        >
          <View style={styles.settingInfo}>
            <Ionicons name="moon" size={24} color={colors.secondaryText} />
            <View style={styles.settingText}>
              <Text
                style={[styles.settingLabel, { color: colors.primaryText }]}
              >
                Dark Mode
              </Text>
              <Text
                style={[
                  styles.settingDescription,
                  { color: colors.secondaryText },
                ]}
              >
                Switch to dark theme
              </Text>
            </View>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={isDarkMode ? colors.primaryDark : colors.surface}
          />
        </View>
      </View>

      <View
        style={[
          styles.section,
          { backgroundColor: colors.surface, shadowColor: colors.shadow },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.primaryText }]}>
          Data Management
        </Text>

        <TouchableOpacity
          style={[styles.settingItem, { borderBottomColor: colors.divider }]}
          onPress={onClearData}
        >
          <View style={styles.settingInfo}>
            <Ionicons name="trash" size={24} color={colors.error} />
            <View style={styles.settingText}>
              <Text style={[styles.settingLabel, { color: colors.error }]}>
                Clear All Data
              </Text>
              <Text
                style={[
                  styles.settingDescription,
                  { color: colors.secondaryText },
                ]}
              >
                Delete all habits and progress
              </Text>
            </View>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.secondaryText}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.settingItem, { borderBottomColor: colors.divider }]}
          onPress={handleExportData}
        >
          <View style={styles.settingInfo}>
            <Ionicons name="download" size={24} color={colors.success} />
            <View style={styles.settingText}>
              <Text style={[styles.settingLabel, { color: colors.success }]}>
                Export Data
              </Text>
              <Text
                style={[
                  styles.settingDescription,
                  { color: colors.secondaryText },
                ]}
              >
                Backup your habits to JSON file
              </Text>
            </View>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.secondaryText}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.settingItem, { borderBottomColor: colors.divider }]}
          onPress={handleImportData}
        >
          <View style={styles.settingInfo}>
            <Ionicons name="cloud-upload" size={24} color={colors.warning} />
            <View style={styles.settingText}>
              <Text style={[styles.settingLabel, { color: colors.warning }]}>
                Import Data
              </Text>
              <Text
                style={[
                  styles.settingDescription,
                  { color: colors.secondaryText },
                ]}
              >
                Restore habits from backup file
              </Text>
            </View>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.secondaryText}
          />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.section,
          { backgroundColor: colors.surface, shadowColor: colors.shadow },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.primaryText }]}>
          About
        </Text>

        <View
          style={[styles.settingItem, { borderBottomColor: colors.divider }]}
        >
          <View style={styles.settingInfo}>
            <Ionicons
              name="information-circle"
              size={24}
              color={colors.secondaryText}
            />
            <View style={styles.settingText}>
              <Text
                style={[styles.settingLabel, { color: colors.primaryText }]}
              >
                Version
              </Text>
              <Text
                style={[
                  styles.settingDescription,
                  { color: colors.secondaryText },
                ]}
              >
                1.0.0
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.settingItem, { borderBottomColor: colors.divider }]}
        >
          <View style={styles.settingInfo}>
            <Ionicons
              name="help-circle"
              size={24}
              color={colors.secondaryText}
            />
            <View style={styles.settingText}>
              <Text
                style={[styles.settingLabel, { color: colors.primaryText }]}
              >
                Help & Support
              </Text>
              <Text
                style={[
                  styles.settingDescription,
                  { color: colors.secondaryText },
                ]}
              >
                Get help with the app
              </Text>
            </View>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.secondaryText}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  section: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
  },
});

export default SettingsScreen;
