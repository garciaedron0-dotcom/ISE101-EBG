import type {
  Announcement,
  InteractiveAnnouncement,
} from '../types/announcement';

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

export const interactiveAnnouncements: InteractiveAnnouncement[] = [
  {
    id: 'ANN-001',
    title: 'Enrollment Reminder',
    category: 'Academic',
    read: false,
    date: 'November 15, 2026',
    description: 'Enrollment for the new semester is now open.',
  },
  {
    id: 'ANN-002',
    title: 'Sports Festival Announcement',
    category: 'Events',
    read: false,
  },
  {
    id: 'ANN-003',
    title: 'Campus Clean-up Drive',
    category: 'Community',
    read: true,
    date: 'November 14, 2026',
    description: 'Join our campus clean-up activity this Friday.',
  },
];

export const findInteractiveAnnouncement = (
  routeId: string,
): InteractiveAnnouncement | undefined => {
  const aliasMatch = /^a([1-9]\d*)$/.exec(routeId);
  const announcementId = aliasMatch
    ? `ANN-${aliasMatch[1].padStart(3, '0')}`
    : routeId;

  return interactiveAnnouncements.find(
    (announcement) => announcement.id === announcementId,
  );
};

export const getAnnouncementRouteId = (id: string): string => {
  const match = /^ANN-(\d+)$/.exec(id);
  return match ? `a${Number(match[1])}` : id;
};

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

export const filterAnnouncements = (category: Announcement['category']) =>
  announcements.filter((item) => item.category === category);

export const formatGreeting = (name: string): string => `Hello, ${name}!`;

export const formatStudentName = (
  firstName: string,
  lastName: string,
): string => `${firstName} ${lastName}`;

export const sumNumbers = (numbers: number[]): number =>
  numbers.reduce((total, number) => total + number, 0);
