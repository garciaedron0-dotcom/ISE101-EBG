import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { findInteractiveAnnouncement } from '../../../services/announcementUtils';

const validAnnouncementId = /^(?:a[1-9]\d*|ANN-\d{3})$/;

export default function AnnouncementDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const routeId = typeof id === 'string' ? id : undefined;
  const isValidId = routeId !== undefined && validAnnouncementId.test(routeId);
  const announcement = isValidId
    ? findInteractiveAnnouncement(routeId)
    : undefined;

  if (!announcement) {
    return (
      <View style={styles.screen}>
        <Stack.Screen options={{ title: 'Announcement Not Found' }} />
        <View style={styles.card}>
          <Text accessibilityRole="header" style={styles.title}>
            Announcement Not Found
          </Text>
          <Text style={styles.body}>
            This announcement link is invalid or the announcement is no longer
            available.
          </Text>
          <Link href="/announcements" asChild>
            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.backButtonText}>
                Back to Announcements
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: announcement.title }} />
      <View style={styles.card}>
        <Text accessibilityRole="header" style={styles.title}>
          {announcement.title}
        </Text>
        <Text style={styles.meta}>Category: {announcement.category}</Text>
        <Text style={styles.meta}>
          Date: {announcement.date ?? 'To be announced'}
        </Text>
        {announcement.description ? (
          <Text style={styles.body}>{announcement.description}</Text>
        ) : null}
        <Text style={styles.status}>
          Status: {announcement.read ? 'Read' : 'Unread'}
        </Text>
        <Link href="/announcements" asChild>
          <Pressable
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.backButtonText}>Back to Announcements</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F4F7FB',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 720,
    backgroundColor: '#FFFFFF',
    borderColor: '#DCE3EC',
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    gap: 14,
  },
  title: {
    color: '#111827',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 30,
  },
  meta: {
    color: '#526070',
    fontSize: 15,
    lineHeight: 23,
  },
  body: {
    color: '#344256',
    fontSize: 16,
    lineHeight: 25,
  },
  status: {
    color: '#526070',
    fontSize: 14,
    fontWeight: '600',
  },
  backButton: {
    alignSelf: 'flex-start',
    minHeight: 48,
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  pressed: {
    opacity: 0.8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
