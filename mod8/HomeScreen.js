import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WelcomeMessage from "../components/WelcomeMessage";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.body}>
        <WelcomeMessage />

        <Text style={styles.text}>Welcome to your screen!</Text>
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: "center",
  },
});
