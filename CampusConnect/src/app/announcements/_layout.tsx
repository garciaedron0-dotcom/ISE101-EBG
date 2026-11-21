import { Stack } from 'expo-router';

export default function AnnouncementsLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: '#F4F7FB' },
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTintColor: '#111827',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'Announcements' }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Announcement Details',
          headerBackTitle: 'Announcements',
        }}
      />
      <Stack.Screen
        name="submit"
        options={{
          title: 'Submit Announcement',
          headerBackTitle: 'Announcements',
        }}
      />
      <Stack.Screen
        name="remote"
        options={{
          title: 'Remote Announcements',
          headerBackTitle: 'Announcements',
        }}
      />
    </Stack>
  );
}
