export interface SamplePost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const samplePostsUrl = 'https://jsonplaceholder.typicode.com/posts?_limit=5';

const isSamplePost = (value: unknown): value is SamplePost =>
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

export const fetchSamplePosts = async (): Promise<SamplePost[]> => {
  try {
    const response = await fetch(samplePostsUrl);
    if (!response.ok) {
      throw new Error(`The server responded with HTTP ${response.status}.`);
    }

    const data: unknown = await response.json();
    if (!Array.isArray(data) || !data.every(isSamplePost)) {
      throw new Error('The server returned posts in an unexpected format.');
    }

    return data;
  } catch (error) {
    const reason =
      error instanceof Error ? error.message : 'An unknown error occurred.';
    throw new Error(`Could not load sample posts. ${reason}`);
  }
};
