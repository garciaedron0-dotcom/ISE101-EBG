import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function WelcomeMessage() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Hello, edron garcia!</Text>
      <Text style={styles.section}>BSIS 3A</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  section: {
    fontSize: 16,
    color: "#666666",
    marginTop: 5,
  },
});
