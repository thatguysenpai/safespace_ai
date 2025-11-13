import { useState, useEffect } from 'react';
import { AppData, Message, JournalEntry, MoodLog } from '@/lib/types';
import { getStoredData, addMessage, addJournalEntry, addMoodLog } from '@/lib/api';

export const useAppData = () => {
  const [data, setData] = useState<AppData>({ messages: [], journalEntries: [], moodLogs: [] });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadedData = getStoredData();
    setData(loadedData);
    setIsLoaded(true);
  }, []);

  const addNewMessage = (message: Message) => {
    const newData = addMessage(message);
    setData(newData);
  };

  const addNewJournalEntry = (entry: JournalEntry) => {
    const newData = addJournalEntry(entry);
    setData(newData);
  };

  const addNewMoodLog = (log: MoodLog) => {
    const newData = addMoodLog(log);
    setData(newData);
  };

  const clearMessages = () => {
    const newData = { ...data, messages: [] };
    setData(newData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('safespace_data', JSON.stringify(newData));
    }
  };

  return {
    data,
    isLoaded,
    addNewMessage,
    addNewJournalEntry,
    addNewMoodLog,
    clearMessages,
  };
};
