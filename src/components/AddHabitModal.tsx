import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HabitFormData } from "../types";
import { useTheme } from "../context/ThemeContext";

interface AddHabitModalProps {
  visible: boolean;
  onClose: () => void;
  onAddHabit: (habitData: HabitFormData) => void;
}

const AddHabitModal: React.FC<AddHabitModalProps> = ({
  visible,
  onClose,
  onAddHabit,
}) => {
  const { colors } = useTheme();
  const [habitName, setHabitName] = useState("");
  const slideAnim = useRef(new Animated.Value(80)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      slideAnim.setValue(80);
      fadeAnim.setValue(0);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleAddHabit = () => {
    const trimmedName = habitName.trim();
    if (!trimmedName) {
      Alert.alert("Error", "Please enter a habit name");
      return;
    }
    onAddHabit({ name: trimmedName });
    setHabitName("");
    onClose();
  };

  const handleCancel = () => {
    setHabitName("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
          <Animated.View
            style={[
              styles.modal,
              {
                backgroundColor: colors.surface,
                shadowColor: colors.shadow,
                transform: [{ translateY: slideAnim }],
                opacity: fadeAnim,
              },
            ]}
          >
            <View style={styles.mascotWrap}>
              <Ionicons
                name="sparkles"
                size={32}
                color={colors.accentText}
                style={{ marginBottom: 2 }}
              />
              {/* <Image source={MASCOT} style={styles.mascot} resizeMode="contain" /> */}
            </View>
            <Text style={[styles.title, { color: colors.primaryText }]}>
              Add New Habit
            </Text>
            <Text style={[styles.label, { color: colors.secondaryText }]}>
              What habit do you want to build?
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                  color: colors.primaryText,
                },
              ]}
              value={habitName}
              onChangeText={setHabitName}
              placeholder="e.g., Drink Water, Exercise, Read"
              placeholderTextColor={colors.secondaryText}
              autoFocus={true}
              returnKeyType="done"
              onSubmitEditing={handleAddHabit}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.cancelButton,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                  },
                ]}
                onPress={handleCancel}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.cancelButtonText,
                    { color: colors.secondaryText },
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.addButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={handleAddHabit}
                activeOpacity={0.8}
              >
                <Text style={styles.addButtonText}>Add Habit</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  modal: {
    borderRadius: 28,
    padding: 28,
    width: "100%",
    maxWidth: 400,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 12,
    alignItems: "center",
  },
  mascotWrap: {
    alignItems: "center",
    marginBottom: 8,
  },
  mascot: {
    width: 48,
    height: 48,
    borderRadius: 16,
    marginBottom: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    fontSize: 17,
    marginBottom: 24,
    width: "100%",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1.5,
  },
  cancelButton: {
    backgroundColor: "#F5F5F5",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  addButton: {
    // Background color applied dynamically
    borderWidth: 0,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default AddHabitModal;
