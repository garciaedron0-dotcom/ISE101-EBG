import { useEffect } from 'react';
import {
  AccessibilityInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';

import type { InteractiveAnnouncement } from '../../types/announcement';
import { AnnouncementCard } from './AnnouncementCard';

interface AnnouncementPanelProps {
  announcements: InteractiveAnnouncement[];
  onToggleRead: (announcementId: string) => void;
}

export function AnnouncementPanel({
  announcements,
  onToggleRead,
}: AnnouncementPanelProps) {
  const unreadAnnouncements = announcements.filter(({ read }) => !read);
  const unreadCount = unreadAnnouncements.length;

  useEffect(() => {
    AccessibilityInfo.announceForAccessibility(
      `Unread announcements: ${unreadCount}`,
    );
  }, [unreadCount]);

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
            onOpenDetails={() =>
              router.push({
                pathname: '/announcements/[id]',
                params: { id: announcement.id },
              })
            }
            onMarkRead={() => onToggleRead(announcement.id)}
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
