import React, { useRef } from "react";
import {
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

interface FloatingActionButtonProps {
  onPress: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
}) => {
  const { colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.fab,
          {
            backgroundColor: colors.primary,
            shadowColor: colors.shadow,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Ionicons name="add" size={32} color="white" />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 36,
    right: 28,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 12,
    zIndex: 100,
  },
});

export default FloatingActionButton;
