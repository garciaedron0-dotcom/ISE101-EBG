import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { campusAnnouncements } from '../../../services/campusAnnouncements';

export default function AnnouncementDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const routeId = Array.isArray(id) ? id[0] : id;
  const normalizedId =
    typeof routeId === 'string' ? routeId.trim() : '';
  const announcement = normalizedId
    ? campusAnnouncements.find((item) => item.id === normalizedId)
    : undefined;

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/announcements/index');
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Announcement Details</Text>
      </View>
      <View style={styles.content}>
        {announcement ? (
          <View style={styles.card}>
            <Text style={styles.announcementTitle}>{announcement.title}</Text>
            <Text style={styles.category}>{announcement.category}</Text>
            <View style={styles.divider} />
            <Text style={styles.details}>{announcement.details}</Text>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.notFound}>Announcement not found.</Text>
          </View>
        )}
        <Pressable
          accessibilityRole="button"
          onPress={goBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.backButtonText}>Back to Previous Screen</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#17324D',
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 30,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
  },
  content: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 720,
    paddingHorizontal: 20,
    paddingTop: 24,
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
  announcementTitle: {
    color: '#17324D',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 30,
  },
  category: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8EDF2',
    marginVertical: 18,
  },
  details: {
    color: '#34475A',
    fontSize: 16,
    lineHeight: 25,
  },
  notFound: {
    color: '#34475A',
    fontSize: 17,
    lineHeight: 25,
  },
  backButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#2563EB',
    borderRadius: 10,
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  buttonPressed: {
    opacity: 0.82,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
