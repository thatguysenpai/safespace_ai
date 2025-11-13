'use client';

import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatSection from './components/ChatSection';
import JournalSection from './components/JournalSection';
import MoodSection from './components/MoodSection';
import InsightsSection from './components/InsightsSection';
import { useAppData } from '@/hooks/useAppData';
import { Section, Message, JournalEntry, MoodLog } from '@/lib/types';

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>('chat');
  const [theme, setTheme] = useState('light');
  const { data, isLoaded, addNewMessage, addNewJournalEntry, addNewMoodLog, clearMessages } =
    useAppData();

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      content,
      isUser: true,
      timestamp: new Date(),
    };
    addNewMessage(userMessage);

    // Simulate bot response (replace this with your local LLM later)
    setTimeout(() => {
      const botMessage: Message = {
        id: `msg_${Date.now()}`,
        content: `I hear you. Thank you for sharing that with me. How does that make you feel? Remember, this is a safe space to express yourself.`,
        isUser: false,
        timestamp: new Date(),
      };
      addNewMessage(botMessage);
    }, 1000);
  };

  const handleAddJournalEntry = (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: `entry_${Date.now()}`,
      timestamp: new Date(),
    };
    addNewJournalEntry(newEntry);
  };

  const handleLogMood = (log: Omit<MoodLog, 'id' | 'timestamp'>) => {
    const newLog: MoodLog = {
      ...log,
      id: `mood_${Date.now()}`,
      timestamp: new Date(),
    };
    addNewMoodLog(newLog);
  };

  const handleNewChat = () => {
    if (confirm('Start a new conversation? This will clear the current chat.')) {
      clearMessages();
    }
  };

  if (!isLoaded) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onNewChat={handleNewChat}
        theme={theme}
        onThemeToggle={handleThemeToggle}
      />
      <main className="main-content">
        {activeSection === 'chat' && (
          <ChatSection messages={data.messages} onSendMessage={handleSendMessage} />
        )}
        {activeSection === 'journal' && (
          <JournalSection entries={data.journalEntries} onAddEntry={handleAddJournalEntry} />
        )}
        {activeSection === 'mood' && (
          <MoodSection moodLogs={data.moodLogs} onLogMood={handleLogMood} />
        )}
        {activeSection === 'insights' && <InsightsSection data={data} />}
      </main>
    </div>
  );
}
