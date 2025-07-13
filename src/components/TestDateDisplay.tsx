import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getToday } from "../utils/dateUtils";

const TestDateDisplay: React.FC = () => {
  const currentDate = getToday();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Test Date: {currentDate}</Text>
      <Text style={styles.subtext}>Change this in dateUtils.ts</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF3CD",
    padding: 8,
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FFEAA7",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#856404",
    textAlign: "center",
  },
  subtext: {
    fontSize: 12,
    color: "#856404",
    textAlign: "center",
    marginTop: 4,
  },
});

export default TestDateDisplay;
