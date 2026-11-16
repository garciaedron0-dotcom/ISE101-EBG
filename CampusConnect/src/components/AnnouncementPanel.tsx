import { useEffect, useState } from 'react';
import {
  AccessibilityInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { InteractiveAnnouncement } from '../../types/announcement';
import { AnnouncementCard } from './AnnouncementCard';

const initialAnnouncements: InteractiveAnnouncement[] = [
  {
    id: 'ANN-001',
    title: 'Enrollment Reminder',
    category: 'Academic',
    read: false,
  },
  {
    id: 'ANN-002',
    title: 'Sports Festival Announcement',
    category: 'Events',
    read: false,
  },
  {
    id: 'ANN-003',
    title: 'Campus Clean-up Drive',
    category: 'Community',
    read: true,
  },
];

export function AnnouncementPanel() {
  const [announcements, setAnnouncements] =
    useState<InteractiveAnnouncement[]>(initialAnnouncements);
  const unreadAnnouncements = announcements.filter(({ read }) => !read);
  const unreadCount = unreadAnnouncements.length;

  useEffect(() => {
    AccessibilityInfo.announceForAccessibility(
      `Unread announcements: ${unreadCount}`,
    );
  }, [unreadCount]);

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
    <View style={styles.panel}>
      <Text style={styles.heading}>Campus Announcements</Text>
      <Text style={styles.unreadCount}>
        Unread Announcements: {unreadCount}
      </Text>
      <View style={styles.cardList}>
        {announcements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            title={announcement.title}
            category={announcement.category}
            read={announcement.read}
            onMarkRead={() => toggleReadStatus(announcement.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#F4F7FB',
    borderRadius: 12,
    marginTop: 20,
    padding: 16,
  },
  heading: {
    color: '#1F2937',
    fontSize: 20,
    fontWeight: '700',
  },
  unreadCount: {
    color: '#475569',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 8,
  },
  cardList: {
    gap: 12,
    marginTop: 16,
  },
});
