import { useRef, useState } from 'react';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ScrollViewInstance,
} from 'react-native';

import { campusAnnouncements } from '../../../services/campusAnnouncements';
import { AnnouncementPanel } from '@/components/AnnouncementPanel';

export default function HomeScreen() {
  const scrollRef = useRef<ScrollViewInstance>(null);
  const [announcements, setAnnouncements] = useState(campusAnnouncements);
  const totalAnnouncements = announcements.length;
  const unreadAnnouncements = announcements.filter(({ read }) => !read);
  const unreadCount = unreadAnnouncements.length;

  const toggleReadStatus = (announcementId: string) => {
    setAnnouncements((currentAnnouncements) =>
      currentAnnouncements.map((announcement) =>
        announcement.id === announcementId
          ? { ...announcement, read: !announcement.read }
          : announcement,
      ),
    );
  };

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Campus Connect</Text>
        <Text style={styles.subtitle}>One campus. Connected students.</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Stay connected with campus news, student life, and community events.
        </Text>

        <View style={styles.campusPhotoCard}>
          <Image
            source={require('@/assets/images/santaritacollege.webp')}
            contentFit="cover"
            style={styles.campusPhoto}
          />
        </View>

        <View style={styles.quickActions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => scrollRef.current?.scrollToEnd({ animated: true })}
            style={({ pressed }) => [
              styles.quickAction,
              pressed && styles.quickActionPressed,
            ]}
          >
            <Text style={styles.quickActionTitle}>Announcements</Text>
            <Text style={styles.quickActionDescription}>Read campus updates</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/explore')}
            style={({ pressed }) => [
              styles.quickAction,
              pressed && styles.quickActionPressed,
            ]}
          >
            <Text style={styles.quickActionTitle}>Explore</Text>
            <Text style={styles.quickActionDescription}>Campus resources</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/profile')}
            style={({ pressed }) => [
              styles.quickAction,
              pressed && styles.quickActionPressed,
            ]}
          >
            <Text style={styles.quickActionTitle}>Open Student Profile</Text>
            <Text style={styles.quickActionDescription}>View your profile</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Campus at a glance</Text>
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

        <AnnouncementPanel
          announcements={announcements}
          onToggleRead={toggleReadStatus}
        />
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
  campusPhotoCard: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 3,
    marginBottom: 18,
    maxWidth: 560,
    overflow: 'hidden',
    shadowColor: '#17324D',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: '100%',
  },
  campusPhoto: {
    height: 220,
    width: '100%',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  quickAction: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DCE3EC',
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    minHeight: 88,
    padding: 12,
  },
  quickActionPressed: {
    opacity: 0.8,
  },
  quickActionTitle: {
    color: '#17324D',
    fontSize: 14,
    fontWeight: '700',
  },
  quickActionDescription: {
    color: '#64748B',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 5,
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
