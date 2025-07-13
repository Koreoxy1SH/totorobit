import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Image } from "react-native";
import { useTheme } from "../context/ThemeContext";

const LOGO = require("../../assets/splash.png"); // Use your logo or mascot here

const CustomSplashScreen: React.FC = () => {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: colors.background, opacity: fadeAnim },
      ]}
    >
      <View style={styles.centerContent}>
        <Image source={LOGO} style={styles.logo} resizeMode="contain" />
        <Text style={[styles.title, { color: colors.primaryText }]}>
          Totorobit
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
    borderRadius: 32,
    // Optionally add shadow for modern look
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: 1.5,
    textAlign: "center",
  },
});

export default CustomSplashScreen;
