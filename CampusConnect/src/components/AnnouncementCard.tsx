import { Pressable, StyleSheet, Text, View } from 'react-native';

export interface AnnouncementCardProps {
  title: string;
  category: string;
  read: boolean;
  onMarkRead: () => void;
}

export function AnnouncementCard({
  title,
  category,
  read,
  onMarkRead,
}: AnnouncementCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.status}>Status: {read ? 'Read' : 'Unread'}</Text>
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
    gap: 7,
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
