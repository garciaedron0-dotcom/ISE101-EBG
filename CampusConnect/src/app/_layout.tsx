import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { AnnouncementProvider } from '@/context/AnnouncementContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AnnouncementProvider>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="announcements" />
      </Stack>
    </AnnouncementProvider>
  );
}
