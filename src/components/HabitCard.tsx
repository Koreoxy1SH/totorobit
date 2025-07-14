import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Habit } from "../types";
import { getToday } from "../utils/dateUtils";
import { useTheme } from "../context/ThemeContext";

interface HabitCardProps {
  habit: Habit;
  onToggleComplete: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
  onPress?: (habit: Habit) => void; // Add this prop
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.35;

const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onToggleComplete,
  onDelete,
  onPress,
}) => {
  const { colors } = useTheme();
  const isCompletedToday = habit.completedDates.includes(getToday());
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const cardOpacity = useRef(new Animated.Value(1)).current;
  const swiped = useRef(false);

  const handleToggle = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.15,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start(() => onToggleComplete(habit));
  };

  const animateDelete = () => {
    Animated.parallel([
      Animated.timing(cardOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: SCREEN_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDelete(habit.id);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10 && Math.abs(gestureState.dy) < 10;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          swiped.current = true;
          animateDelete();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  return (
    <View style={{ position: "relative" }}>
      {/* Red background with trash icon revealed on swipe */}
      <Animated.View
        style={[
          styles.deleteBg,
          {
            backgroundColor: colors.error,
            opacity: translateX.interpolate({
              inputRange: [0, SWIPE_THRESHOLD],
              outputRange: [0, 0.18],
              extrapolate: "clamp",
            }),
          },
        ]}
        pointerEvents="none"
      >
        <Ionicons
          name="trash"
          size={32}
          color="white"
          style={styles.trashIcon}
        />
      </Animated.View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            shadowColor: colors.shadow,
            borderColor: isCompletedToday ? colors.success : colors.border,
            transform: [{ translateX }, { scale: scaleAnim }],
            opacity: cardOpacity,
          },
          isCompletedToday && {
            borderWidth: 2,
            shadowColor: colors.success,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.checkCircleWrap}
          onPress={handleToggle}
          activeOpacity={0.7}
        >
          <Animated.View
            style={[
              styles.checkCircle,
              {
                backgroundColor: isCompletedToday
                  ? colors.primary
                  : colors.background,
                borderColor: isCompletedToday ? colors.primary : colors.border,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            {isCompletedToday && (
              <Ionicons name="checkmark" size={28} color="white" />
            )}
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => onPress && onPress(habit)}
          activeOpacity={0.7}
        >
          <Animated.View
            style={[
              styles.infoWrap,
              {
                transform: [{ translateX }],
              },
            ]}
          >
            <Text
              style={[
                styles.habitName,
                { color: colors.primaryText },
                isCompletedToday && {
                  textDecorationLine: "line-through",
                  color: colors.success,
                },
              ]}
              numberOfLines={1}
            >
              {habit.name}
            </Text>
            <View style={styles.streakBadge}>
              <Ionicons name="flame" size={16} color={colors.success} />
              <Text style={[styles.streakText, { color: colors.success }]}>
                {" "}
                {habit.currentStreak}d
              </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
        {/* Delete button removed, replaced by swipe */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
  },
  deleteBg: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "flex-start",
    zIndex: 0,
  },
  trashIcon: {
    marginLeft: 32,
  },
  checkCircleWrap: {
    marginRight: 18,
  },
  checkCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  infoWrap: {
    flex: 1,
    justifyContent: "center",
  },
  habitName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(76,175,80,0.08)",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 2,
  },
  streakText: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default HabitCard;
