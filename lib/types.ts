export type Section = 'chat' | 'journal' | 'mood' | 'insights';

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface JournalEntry {
  id: string;
  heading: string;
  content: string;
  mood: string;
  timestamp: Date;
}

export interface MoodLog {
  id: string;
  value: number;
  note?: string;
  timestamp: Date;
}

export interface AppData {
  messages: Message[];
  journalEntries: JournalEntry[];
  moodLogs: MoodLog[];
}

export interface InsightData {
  averageMood: string;
  entryCount: number;
  moodCount: number;
  streakDays: number;
  triggers: string[];
}
