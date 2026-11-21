import { createContext, useContext, useState, type ReactNode } from 'react';

type AnnouncementContextValue = {
  submittedCount: number;
  recordSubmission: () => void;
};

export const AnnouncementContext = createContext<
  AnnouncementContextValue | undefined
>(undefined);

export function AnnouncementProvider({ children }: { children: ReactNode }) {
  const [submittedCount, setSubmittedCount] = useState(0);

  const recordSubmission = () => {
    setSubmittedCount((count) => count + 1);
  };

  return (
    <AnnouncementContext.Provider
      value={{ submittedCount, recordSubmission }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
}

export function useAnnouncementContext(): AnnouncementContextValue {
  const context = useContext(AnnouncementContext);

  if (!context) {
    throw new Error(
      'useAnnouncementContext must be used within AnnouncementProvider.',
    );
  }

  return context;
}
