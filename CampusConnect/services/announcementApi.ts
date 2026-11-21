import type { ApiPost } from '../types/apiPost';

const announcementsUrl = 'https://jsonplaceholder.typicode.com/posts';

const isApiPost = (value: unknown): value is ApiPost =>
  typeof value === 'object' &&
  value !== null &&
  'userId' in value &&
  typeof value.userId === 'number' &&
  'id' in value &&
  typeof value.id === 'number' &&
  'title' in value &&
  typeof value.title === 'string' &&
  'body' in value &&
  typeof value.body === 'string';

export async function getAnnouncements(): Promise<ApiPost[]> {
  const response = await fetch(announcementsUrl);

  if (!response.ok) {
    throw new Error(`Request failed with HTTP status ${response.status}.`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('The server returned an unexpected response format.');
  }

  if (!data.every(isApiPost)) {
    throw new Error('The server returned invalid announcement data.');
  }

  return data;
}
