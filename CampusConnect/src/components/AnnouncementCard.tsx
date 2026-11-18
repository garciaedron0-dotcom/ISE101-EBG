import { Pressable, StyleSheet, Text, View } from 'react-native';

export interface AnnouncementCardProps {
  title: string;
  category: string;
  read: boolean;
  onOpenDetails: () => void;
  onMarkRead: () => void;
}

export function AnnouncementCard({
  title,
  category,
  read,
  onOpenDetails,
  onMarkRead,
}: AnnouncementCardProps) {
  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`View ${title} announcement details`}
        onPress={onOpenDetails}
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
    alignSelf: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    borderRadius: 8,
    marginTop: 5,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
