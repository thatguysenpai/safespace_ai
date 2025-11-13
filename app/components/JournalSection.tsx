'use client';

import { useState, useMemo } from 'react';
import { JournalEntry } from '@/lib/types';

interface JournalSectionProps {
  entries: JournalEntry[];
  onAddEntry: (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => void;
}

export default function JournalSection({ entries, onAddEntry }: JournalSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [filter, setFilter] = useState('');

  const moods = ['😢', '😟', '😐', '🙂', '😊'];

  const filteredEntries = useMemo(() => {
    if (!filter) return entries;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return entries.filter((entry) => {
      const entryDate = new Date(entry.timestamp);
      const entryDay = new Date(entryDate.getFullYear(), entryDate.getMonth(), entryDate.getDate());

      if (filter === 'today') {
        return entryDay.getTime() === today.getTime();
      } else if (filter === 'week') {
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return entryDay >= weekAgo;
      } else if (filter === 'month') {
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return entryDay >= monthAgo;
      }
      return true;
    });
  }, [entries, filter]);

  const handleSave = () => {
    if (heading.trim() && content.trim() && selectedMood) {
      onAddEntry({
        heading: heading.trim(),
        content: content.trim(),
        mood: selectedMood,
      });
      setHeading('');
      setContent('');
      setSelectedMood('');
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setHeading('');
    setContent('');
    setSelectedMood('');
    setIsModalOpen(false);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <section className="content-section active">
      <div className="section-header">
        <h1>Daily Journal</h1>
        <p>Reflect and document your feelings</p>
      </div>

      <div className="journal-controls">
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          Write New Entry
        </button>
        <select
          className="journal-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Entries</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className="journal-entries">
        {filteredEntries.length === 0 ? (
          <p className="empty-state">
            No journal entries yet. Start by writing your first entry!
          </p>
        ) : (
          filteredEntries
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .map((entry) => (
              <div key={entry.id} className="journal-entry">
                <div className="entry-meta">
                  <span>{formatDate(entry.timestamp)}</span>
                  <span className="entry-mood">{entry.mood}</span>
                </div>
                <h3 className="entry-heading">{entry.heading}</h3>
                <p className="entry-preview">{entry.content}</p>
              </div>
            ))
        )}
      </div>

      {/* Entry Modal */}
      <div className={`modal ${isModalOpen ? 'active' : ''}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>New Entry</h2>
            <button className="modal-close" onClick={handleCancel}>
              ×
            </button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="entry-input"
              placeholder="How are you feeling today?"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
            />
            <textarea
              className="entry-textarea"
              placeholder="Write your thoughts here..."
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="mood-selector">
              <label>How are you feeling?</label>
              <div className="mood-options">
                {moods.map((mood) => (
                  <button
                    key={mood}
                    className={`mood-btn ${selectedMood === mood ? 'selected' : ''}`}
                    onClick={() => setSelectedMood(mood)}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save Entry
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
