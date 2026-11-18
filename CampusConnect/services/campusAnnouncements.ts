import type { InteractiveAnnouncement } from '../types/announcement';

export const campusAnnouncements: InteractiveAnnouncement[] = [
  {
    id: '101',
    title: 'Enrollment Reminder',
    category: 'Academic',
    details: "Check the registrar's posted enrollment schedule.",
    read: false,
  },
  {
    id: '102',
    title: 'Sports Festival',
    category: 'Events',
    details: 'Watch for the official sports festival program.',
    read: false,
  },
  {
    id: '103',
    title: 'Campus Clean-up Drive',
    category: 'Community',
    details: 'Join the campus clean-up activity.',
    read: true,
  },
];
