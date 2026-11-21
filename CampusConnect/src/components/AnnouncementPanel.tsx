import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'expo-router';
import {
  AccessibilityInfo,
  FlatList,
  type ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';

import type { InteractiveAnnouncement } from '../../types/announcement';
import { campusAnnouncements } from '../../services/campusAnnouncements';
import { SectionHeading } from './SectionHeading';
import { AnnouncementCard } from './AnnouncementCard';

export interface AnnouncementPanelProps {
  announcements?: InteractiveAnnouncement[];
  onToggleRead?: (announcementId: string) => void;
  renderPageHeader?: (onViewAll: () => void) => ReactElement;
}

export function AnnouncementPanel({
  announcements,
  onToggleRead,
  renderPageHeader,
}: AnnouncementPanelProps) {
  const [internalAnnouncements, setInternalAnnouncements] =
    useState<InteractiveAnnouncement[]>(() => [...campusAnnouncements]);
  const router = useRouter();
  const displayedAnnouncements = announcements ?? internalAnnouncements;
  const unreadCount = displayedAnnouncements.filter(({ read }) => !read).length;

  const toggleReadStatus = (announcementId: string) => {
    if (onToggleRead) {
      onToggleRead(announcementId);
      return;
    }

    setInternalAnnouncements((currentAnnouncements) =>
      currentAnnouncements.map((announcement) =>
        announcement.id === announcementId
          ? { ...announcement, read: !announcement.read }
          : announcement,
      ),
    );
  };

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

  const handleViewAll = () => router.push('/announcements/index');

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={displayedAnnouncements}
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
      extraData={displayedAnnouncements}
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
