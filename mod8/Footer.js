import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2026 Student App Project</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    color: "#673AB7",
  },
});
