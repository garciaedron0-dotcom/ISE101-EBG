import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  AccessibilityInfo,
  FlatList,
  type ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import type { ReactElement } from 'react';

import type { InteractiveAnnouncement } from '../../types/announcement';
import { interactiveAnnouncements } from '../../services/announcementUtils';
import { SectionHeading } from './SectionHeading';
import { AnnouncementCard } from './AnnouncementCard';

export interface AnnouncementPanelProps {
  renderPageHeader?: (onViewAll: () => void) => ReactElement;
}

export function AnnouncementPanel({
  renderPageHeader,
}: AnnouncementPanelProps) {
  const [announcements, setAnnouncements] =
    useState<InteractiveAnnouncement[]>(() => [...interactiveAnnouncements]);
  const router = useRouter();
  const unreadAnnouncements = announcements.filter(({ read }) => !read);
  const unreadCount = unreadAnnouncements.length;
  const renderAnnouncement: ListRenderItem<InteractiveAnnouncement> = ({
    item,
  }) => (
    <View style={styles.itemContainer}>
      <AnnouncementCard
        id={item.id}
        title={item.title}
        category={item.category}
        read={item.read}
        onMarkRead={() => toggleReadStatus(item.id)}
      />
    </View>
  );

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

  const handleViewAll = () => router.push('/announcements');

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={announcements}
      keyExtractor={(item) => item.id}
      renderItem={renderAnnouncement}
      ItemSeparatorComponent={CardSeparator}
      ListHeaderComponent={
        <View style={styles.listHeader}>
          {renderPageHeader?.(handleViewAll)}
          <View style={styles.announcementHeading}>
            <SectionHeading
              title="Campus Announcements"
              subtitle={`Unread Announcements: ${unreadCount}`}
            />
          </View>
        </View>
      }
      extraData={announcements}
    />
  );
}

function CardSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },
  listContent: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 110,
  },
  listHeader: {
    width: '100%',
    maxWidth: 760,
  },
  announcementHeading: {
    marginTop: 24,
    marginBottom: 16,
  },
  separator: {
    height: 12,
  },
  itemContainer: {
    width: '100%',
    maxWidth: 760,
  },
});
