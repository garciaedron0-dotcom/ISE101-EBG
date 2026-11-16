import { ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  announcements,
  countUnread,
  getTotalAnnouncements,
  getUnreadAnnouncements,
} from '../../services/announcementUtils';

export default function HomeScreen() {
  const totalAnnouncements = getTotalAnnouncements(announcements);
  const unreadAnnouncements = getUnreadAnnouncements();
  const unreadCount = countUnread(announcements);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Campus Connect</Text>
        <Text style={styles.subtitle}>One campus. Connected students.</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Welcome to the Week 1 project foundation.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Announcement Utility Test</Text>
          <View style={styles.divider} />
          <Text style={styles.stat}>
            Total Announcements: {totalAnnouncements}
          </Text>
          <Text style={styles.stat}>Unread Announcements: {unreadCount}</Text>
          {unreadAnnouncements.map(({ id, title }) => (
            <Text key={id} style={styles.unreadTitle}>
              • {title}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 36,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#17324D',
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 30,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#D5E4F2',
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 720,
    paddingHorizontal: 20,
  },
  description: {
    color: '#59697A',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 22,
    shadowColor: '#17324D',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    color: '#17324D',
    fontSize: 19,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#E8EDF2',
    marginVertical: 15,
  },
  stat: {
    color: '#34475A',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 24,
  },
  unreadTitle: {
    color: '#1769AA',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
  },
});
