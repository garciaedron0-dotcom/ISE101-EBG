import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export interface AnnouncementCardProps {
  id: string;
  title: string;
  category: string;
  read: boolean;
  onMarkRead: () => void;
}

export function AnnouncementCard({
  id,
  title,
  category,
  read,
  onMarkRead,
}: AnnouncementCardProps) {
  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`View ${title} announcement details`}
        onPress={() =>
          router.push({
            pathname: '/announcements/[id]',
            params: { id },
          })
        }
        style={({ pressed }) => [
          styles.details,
          pressed && styles.detailsPressed,
        ]}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.status}>Status: {read ? 'Read' : 'Unread'}</Text>
        <Text style={styles.detailsLink}>View details</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={onMarkRead}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>
          {read ? 'Mark as Unread' : 'Mark as Read'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderColor: '#DCE3EC',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  details: {
    gap: 7,
  },
  detailsPressed: {
    opacity: 0.75,
  },
  title: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '700',
    flexShrink: 1,
  },
  category: {
    color: '#64748B',
    fontSize: 14,
  },
  status: {
    color: '#475569',
    fontSize: 14,
  },
  detailsLink: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    minHeight: 48,
    minWidth: 48,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  buttonPressed: {
    opacity: 0.78,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});
