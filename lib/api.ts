import { AppData, JournalEntry, MoodLog, Message, InsightData } from './types';

const STORAGE_KEY = 'safespace_data';

export const getStoredData = (): AppData => {
  if (typeof window === 'undefined') {
    return { messages: [], journalEntries: [], moodLogs: [] };
  }
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return { messages: [], journalEntries: [], moodLogs: [] };
  }
  
  const data = JSON.parse(stored);
  // Convert string dates back to Date objects
  return {
    messages: data.messages.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })),
    journalEntries: data.journalEntries.map((e: any) => ({ ...e, timestamp: new Date(e.timestamp) })),
    moodLogs: data.moodLogs.map((l: any) => ({ ...l, timestamp: new Date(l.timestamp) })),
  };
};

export const saveData = (data: AppData): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

export const addMessage = (message: Message): AppData => {
  const data = getStoredData();
  data.messages.push(message);
  saveData(data);
  return data;
};

export const addJournalEntry = (entry: JournalEntry): AppData => {
  const data = getStoredData();
  data.journalEntries.push(entry);
  saveData(data);
  return data;
};

export const addMoodLog = (log: MoodLog): AppData => {
  const data = getStoredData();
  data.moodLogs.push(log);
  saveData(data);
  return data;
};

export const getInsights = (): InsightData => {
  const data = getStoredData();
  
  // Calculate average mood for this week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const weekMoods = data.moodLogs.filter(log => log.timestamp >= oneWeekAgo);
  const averageMood = weekMoods.length > 0
    ? (weekMoods.reduce((sum, log) => sum + log.value, 0) / weekMoods.length).toFixed(1)
    : '—';
  
  // Extract triggers from mood notes
  const triggers: { [key: string]: number } = {};
  data.moodLogs.forEach(log => {
    if (log.note) {
      const words = log.note.toLowerCase().split(/\s+/);
      words.forEach(word => {
        if (word.length > 3) {
          triggers[word] = (triggers[word] || 0) + 1;
        }
      });
    }
  });
  
  const topTriggers = Object.entries(triggers)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);
  
  // Calculate streak (simplified)
  const sortedLogs = [...data.moodLogs].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  let streak = 0;
  if (sortedLogs.length > 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < sortedLogs.length; i++) {
      const logDate = new Date(sortedLogs[i].timestamp);
      logDate.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((today.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === i) {
        streak++;
      } else {
        break;
      }
    }
  }
  
  return {
    averageMood,
    entryCount: data.journalEntries.length,
    moodCount: weekMoods.length,
    streakDays: streak,
    triggers: topTriggers,
  };
};
