import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  announcements,
  countUnread,
  getTotalAnnouncements,
  getUnreadAnnouncements,
} from '../../services/announcementUtils';
import { ActionButton } from '../components/ActionButton';
import { AnnouncementPanel } from '../components/AnnouncementPanel';
import { SectionHeading } from '../components/SectionHeading';

export default function HomeScreen() {
  const totalAnnouncements = getTotalAnnouncements(announcements);
  const unreadAnnouncements = getUnreadAnnouncements();
  const unreadCount = countUnread(announcements);

  return (
    <AnnouncementPanel
      renderPageHeader={(onViewAll) => (
        <View style={styles.pageHeader}>
          <View style={styles.section}>
            <SectionHeading
              title="Campus Connect"
              subtitle="One campus. Connected students."
              align="center"
              level="hero"
            />
          </View>

          <View style={styles.banner}>
            <Text accessibilityRole="header" style={styles.bannerTitle}>
              Campus Announcements
            </Text>
            <Text style={styles.bannerSubtitle}>
              Stay updated with the latest campus news.
            </Text>
            <ActionButton
              label="View All Announcements"
              onPress={onViewAll}
            />

            <Image
              source={require('../../assets/images/santaritacollege.webp')}
              accessibilityLabel="Santa Rita College of Pampanga school seal"
              resizeMode="contain"
              style={styles.campusImage}
            />
          </View>

          <View style={styles.utilityCard}>
            <Text accessibilityRole="header" style={styles.utilityTitle}>
              Announcement Utility Test
            </Text>
            <View style={styles.divider} />
            <Text style={styles.utilityStat}>
              Total Announcements: {totalAnnouncements}
            </Text>
            <Text style={styles.utilityStat}>
              Unread Announcements: {unreadCount}
            </Text>
            {unreadAnnouncements.map(({ id, title }) => (
              <Text key={id} style={styles.utilityUnread}>
                • {title}
              </Text>
            ))}
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  pageHeader: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 24,
  },
  section: {
    width: '100%',
    paddingHorizontal: 8,
  },
  banner: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderColor: '#DCE3EC',
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 20,
    padding: 20,
    gap: 12,
  },
  bannerTitle: {
    color: '#111827',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 29,
  },
  bannerSubtitle: {
    color: '#526070',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 4,
  },
  campusImage: {
    width: '100%',
    height: 180,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 4,
  },
  utilityCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderColor: '#DCE3EC',
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 20,
    padding: 20,
  },
  utilityTitle: {
    color: '#111827',
    fontSize: 19,
    fontWeight: '700',
    lineHeight: 26,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8EDF2',
    marginVertical: 14,
  },
  utilityStat: {
    color: '#526070',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 24,
  },
  utilityUnread: {
    color: '#2563EB',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 8,
  },
});
