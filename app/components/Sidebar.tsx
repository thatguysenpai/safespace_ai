'use client';

import { Section } from '@/lib/types';

interface SidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  onNewChat: () => void;
  theme: string;
  onThemeToggle: () => void;
}

export default function Sidebar({
  activeSection,
  onSectionChange,
  onNewChat,
  theme,
  onThemeToggle,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🌿</span>
          <span className="logo-text">Safespace</span>
        </div>
        <button
          className="theme-toggle"
          onClick={onThemeToggle}
          aria-label="Toggle theme"
        >
          <span className="theme-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
        </button>
      </div>

      <button className="new-chat-btn" onClick={onNewChat}>
        <span>+ New Conversation</span>
      </button>

      <nav className="main-nav">
        <button
          className={`nav-item ${activeSection === 'chat' ? 'active' : ''}`}
          onClick={() => onSectionChange('chat')}
        >
          <span className="nav-icon">💬</span>
          <span className="nav-label">Chat</span>
        </button>
        <button
          className={`nav-item ${activeSection === 'journal' ? 'active' : ''}`}
          onClick={() => onSectionChange('journal')}
        >
          <span className="nav-icon">📔</span>
          <span className="nav-label">Journal</span>
        </button>
        <button
          className={`nav-item ${activeSection === 'mood' ? 'active' : ''}`}
          onClick={() => onSectionChange('mood')}
        >
          <span className="nav-icon">😊</span>
          <span className="nav-label">Mood Tracker</span>
        </button>
        <button
          className={`nav-item ${activeSection === 'insights' ? 'active' : ''}`}
          onClick={() => onSectionChange('insights')}
        >
          <span className="nav-icon">📊</span>
          <span className="nav-label">Insights</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <p>Take care of yourself. You deserve it.</p>
      </div>
    </aside>
  );
}
