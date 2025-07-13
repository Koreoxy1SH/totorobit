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
        <Ionicons
          name="settings"
          size={28}
          color={colors.accentText}
          style={{ marginRight: 10 }}
        />
        <Text style={[styles.title, { color: colors.primaryText }]}>
          Settings
        </Text>
      </View>

      {/* Preferences Section */}
      <View
        style={[
          styles.sectionCard,
          { backgroundColor: colors.surface, shadowColor: colors.shadow },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.primaryText }]}>
          Preferences
        </Text>
        <View style={styles.settingItemRow}>
          <View style={styles.settingIconWrap}>
            <Ionicons
              name="notifications"
              size={22}
              color={colors.secondaryText}
            />
          </View>
          <View style={styles.settingTextWrap}>
            <Text style={[styles.settingLabel, { color: colors.primaryText }]}>
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
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={
              notificationsEnabled ? colors.primaryDark : colors.surface
            }
          />
        </View>
        <View style={styles.settingItemRow}>
          <View style={styles.settingIconWrap}>
            <Ionicons name="moon" size={22} color={colors.secondaryText} />
          </View>
          <View style={styles.settingTextWrap}>
            <Text style={[styles.settingLabel, { color: colors.primaryText }]}>
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
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={isDarkMode ? colors.primaryDark : colors.surface}
          />
        </View>
      </View>

      {/* Data Management Section */}
      <View
        style={[
          styles.sectionCard,
          { backgroundColor: colors.surface, shadowColor: colors.shadow },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.primaryText }]}>
          Data Management
        </Text>
        <TouchableOpacity style={styles.settingItemRow} onPress={onClearData}>
          <View style={styles.settingIconWrap}>
            <Ionicons name="trash" size={22} color={colors.error} />
          </View>
          <View style={styles.settingTextWrap}>
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
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.secondaryText}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItemRow}
          onPress={handleExportData}
        >
          <View style={styles.settingIconWrap}>
            <Ionicons name="download" size={22} color={colors.success} />
          </View>
          <View style={styles.settingTextWrap}>
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
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.secondaryText}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItemRow}
          onPress={handleImportData}
        >
          <View style={styles.settingIconWrap}>
            <Ionicons name="cloud-upload" size={22} color={colors.warning} />
          </View>
          <View style={styles.settingTextWrap}>
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
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.secondaryText}
          />
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <View
        style={[
          styles.sectionCard,
          { backgroundColor: colors.surface, shadowColor: colors.shadow },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.primaryText }]}>
          About
        </Text>
        <View style={styles.settingItemRow}>
          <View style={styles.settingIconWrap}>
            <Ionicons
              name="information-circle"
              size={22}
              color={colors.secondaryText}
            />
          </View>
          <View style={styles.settingTextWrap}>
            <Text style={[styles.settingLabel, { color: colors.primaryText }]}>
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
        <TouchableOpacity style={styles.settingItemRow}>
          <View style={styles.settingIconWrap}>
            <Ionicons
              name="help-circle"
              size={22}
              color={colors.secondaryText}
            />
          </View>
          <View style={styles.settingTextWrap}>
            <Text style={[styles.settingLabel, { color: colors.primaryText }]}>
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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  sectionCard: {
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 0,
    borderRadius: 18,
    padding: 18,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
    marginLeft: 2,
  },
  settingItemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  settingIconWrap: {
    width: 36,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  settingTextWrap: {
    flex: 1,
    justifyContent: "center",
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    opacity: 0.85,
  },
});

export default SettingsScreen;
