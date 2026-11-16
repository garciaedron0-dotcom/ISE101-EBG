import type { Announcement, AnnouncementCategory } from '../types/announcement';

export const announcements: Announcement[] = [
  {
    id: 1,
    title: 'Enrollment reminders',
    message: 'Enrollment for the new semester is now open.',
    category: 'Academic',
    date: 'November 15, 2026',
    isPinned: true,
    read: false,
  },
  {
    id: 2,
    title: 'Campus clean-up drive',
    message: 'Join our campus clean-up activity this Friday.',
    category: 'Event',
    date: 'November 14, 2026',
    isPinned: false,
    read: true,
  },
];

export const getAnnouncements = (): Announcement[] => [...announcements];

export const getUnreadAnnouncements = (): Announcement[] =>
  announcements.filter(({ read }) => !read);

export const countUnread = (items: Announcement[]): number =>
  items.reduce((total, { read }) => total + (read ? 0 : 1), 0);

export const getAnnouncementTitles = (
  items: Announcement[] = announcements,
): string[] => items.map(({ title }) => title);

export const getTotalAnnouncements = (
  items: Announcement[] = announcements,
): number => items.reduce((total) => total + 1, 0);

export const findAnnouncement = (id: number): Announcement | undefined =>
  announcements.find((item) => item.id === id);

export const filterAnnouncements = (
  category: AnnouncementCategory,
): Announcement[] => announcements.filter((item) => item.category === category);

export const formatGreeting = (name: string): string => `Hello, ${name}!`;

export const formatStudentName = (
  firstName: string,
  lastName: string,
): string => `${firstName} ${lastName}`;

export const sumNumbers = (numbers: number[]): number =>
  numbers.reduce((total, number) => total + number, 0);
