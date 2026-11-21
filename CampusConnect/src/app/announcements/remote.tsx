import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';

import { getAnnouncements } from '../../../services/announcementApi';
import type { ApiPost } from '../../../types/apiPost';

export default function RemoteAnnouncementsScreen() {
  const [items, setItems] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadAnnouncements = useCallback(async (isActive = true) => {
    if (isActive) {
      setLoading(true);
      setError('');
    }

    try {
      const announcements = await getAnnouncements();
      if (isActive) {
        setItems(announcements);
      }
    } catch (requestError) {
      if (isActive) {
        const message =
          requestError instanceof Error
            ? requestError.message
            : 'An unexpected network error occurred.';
        setError(`Unable to load remote announcements. ${message}`);
      }
    } finally {
      if (isActive) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    let active = true;
    void loadAnnouncements(active);

    return () => {
      active = false;
    };
  }, [loadAnnouncements]);

  const renderAnnouncement: ListRenderItem<ApiPost> = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text accessibilityRole="header" style={styles.loadingText}>
          Loading announcements...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerState}>
        <View style={styles.messageCard}>
          <Text accessibilityRole="alert" style={styles.errorText}>
            {error}
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => void loadAnnouncements()}
            style={({ pressed }) => [
              styles.retryButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.centerState}>
        <Text accessibilityRole="header" style={styles.emptyText}>
          No announcements are available.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderAnnouncement}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text accessibilityRole="header" style={styles.heading}>
              Remote Announcements
            </Text>
            <Text style={styles.disclaimer}>
              Demonstration posts from JSONPlaceholder, not official campus
              announcements.
            </Text>
          </View>
        }
      />
    </View>
  );
}

function ItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },
  listContent: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    width: '100%',
    maxWidth: 760,
    marginBottom: 16,
  },
  heading: {
    color: '#17324D',
    fontSize: 24,
    fontWeight: '700',
  },
  disclaimer: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
  },
  card: {
    width: '100%',
    maxWidth: 760,
    backgroundColor: '#FFFFFF',
    borderColor: '#DCE3EC',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  title: {
    color: '#17324D',
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 24,
  },
  body: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 8,
  },
  separator: {
    height: 12,
  },
  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F6FA',
    padding: 20,
  },
  loadingText: {
    color: '#34475A',
    fontSize: 16,
    marginTop: 12,
  },
  messageCard: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: '#FFFFFF',
    borderColor: '#DCE3EC',
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 16,
    lineHeight: 24,
  },
  retryButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#2563EB',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 16,
    minHeight: 48,
    paddingHorizontal: 18,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.78,
  },
  emptyText: {
    color: '#34475A',
    fontSize: 17,
    fontWeight: '600',
  },
});
