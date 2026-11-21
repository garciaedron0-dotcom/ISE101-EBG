import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { AnnouncementPanel } from '../../components/AnnouncementPanel';

export default function AnnouncementsScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.navigation}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/announcements/remote')}
          style={({ pressed }) => [
            styles.remoteButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.remoteButtonText}>
            View Remote Announcements
          </Text>
        </Pressable>
      </View>
      <AnnouncementPanel />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  navigation: {
    alignItems: 'center',
    backgroundColor: '#F4F7FB',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  remoteButton: {
    alignItems: 'center',
    backgroundColor: '#2563EB',
    borderRadius: 10,
    justifyContent: 'center',
    maxWidth: 760,
    minHeight: 48,
    paddingHorizontal: 18,
    width: '100%',
  },
  remoteButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.78,
  },
});
