export type AnnouncementCategory = 'Academic' | 'Event' | 'Community';

export interface Announcement {
  id: number;
  title: string;
  message: string;
  category: AnnouncementCategory;
  date: string;
  isPinned: boolean;
  read: boolean;
}

export interface InteractiveAnnouncement {
  id: string;
  title: string;
  category: string;
  read: boolean;
}

export interface StudentProfile {
  firstName: string;
  lastName: string;
  yearLevel?: number;
}
