import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Text accessibilityRole="header" style={styles.heading}>
        Campus Connect
      </Text>
      <View style={styles.card}>
        <Text style={styles.title}>Student Profile</Text>
        <ProfileRow label="Name" value="Student name placeholder" />
        <ProfileRow label="Student ID" value="Not provided" />
        <ProfileRow label="Course" value="Not provided" />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.body}>
          Profile and app settings will be available in a future module.
        </Text>
      </View>
    </ScrollView>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.body}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },
  content: {
    alignItems: 'center',
    width: '100%',
    padding: 20,
    paddingBottom: 40,
    gap: 16,
  },
  heading: {
    width: '100%',
    maxWidth: 720,
    color: '#111827',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 4,
  },
  card: {
    width: '100%',
    maxWidth: 720,
    backgroundColor: '#FFFFFF',
    borderColor: '#DCE3EC',
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    gap: 16,
  },
  title: {
    color: '#111827',
    fontSize: 19,
    fontWeight: '700',
  },
  row: {
    gap: 4,
  },
  label: {
    color: '#526070',
    fontSize: 14,
    fontWeight: '600',
  },
  body: {
    color: '#344256',
    fontSize: 15,
    lineHeight: 23,
  },
});
