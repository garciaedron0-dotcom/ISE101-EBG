import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, I'm Edron!</Text>
      <Text style={styles.subtitle}>Welcome to React Native!</Text>
      <Text style={styles.section}>BSIS 3A</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6F4FF',
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#164E8C',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#555555',
    marginBottom: 16,
    textAlign: 'center',
  },
  section: {
    fontSize: 16,
    color: '#087F5B',
    fontWeight: '600',
    marginTop: 8,
  },
});
