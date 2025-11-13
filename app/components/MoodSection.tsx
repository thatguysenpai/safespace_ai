'use client';

import { useState, useMemo } from 'react';
import { MoodLog } from '@/lib/types';

interface MoodSectionProps {
  moodLogs: MoodLog[];
  onLogMood: (log: Omit<MoodLog, 'id' | 'timestamp'>) => void;
}

export default function MoodSection({ moodLogs, onLogMood }: MoodSectionProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');

  const moods = [
    { value: 1, label: '😢 Terrible' },
    { value: 2, label: '😟 Bad' },
    { value: 3, label: '😐 Okay' },
    { value: 4, label: '🙂 Good' },
    { value: 5, label: '😊 Great' },
  ];

  const weeklyData = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const weekData: { day: string; value: number; count: number }[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayStart = new Date(date.setHours(0, 0, 0, 0));
      const dayEnd = new Date(date.setHours(23, 59, 59, 999));

      const dayLogs = moodLogs.filter((log) => {
        const logDate = new Date(log.timestamp);
        return logDate >= dayStart && logDate <= dayEnd;
      });

      const avgValue =
        dayLogs.length > 0
          ? dayLogs.reduce((sum, log) => sum + log.value, 0) / dayLogs.length
          : 0;

      weekData.push({
        day: days[date.getDay()],
        value: avgValue,
        count: dayLogs.length,
      });
    }

    return weekData;
  }, [moodLogs]);

  const handleLogMood = () => {
    if (selectedMood !== null) {
      onLogMood({
        value: selectedMood,
        note: note.trim() || undefined,
      });
      setSelectedMood(null);
      setNote('');
    }
  };

  return (
    <section className="content-section active">
      <div className="section-header">
        <h1>Mood Tracker</h1>
        <p>Monitor your emotional wellbeing</p>
      </div>

      <div className="mood-tracker">
        <div className="mood-logging">
          <h2>Log Your Mood</h2>
          <div className="mood-selector-large">
            <div>
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  className={`mood-btn-large ${
                    selectedMood === mood.value ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedMood(mood.value)}
                >
                  {mood.label}
                </button>
              ))}
            </div>
          </div>
          <textarea
            className="mood-note"
            placeholder="What triggered this mood? (optional)"
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleLogMood}>
            Log Mood
          </button>
        </div>

        <div className="mood-chart">
          <h2>Weekly Mood Pattern</h2>
          <div className="chart">
            {weeklyData.length > 0 ? (
              weeklyData.map((day, index) => (
                <div
                  key={index}
                  className="chart-bar"
                  style={{
                    height: day.value > 0 ? `${(day.value / 5) * 100}%` : '20px',
                  }}
                  title={`${day.day}: ${day.value.toFixed(1)} (${day.count} logs)`}
                >
                  <span className="chart-bar-label">{day.day}</span>
                </div>
              ))
            ) : (
              <div className="chart-placeholder">Loading your mood data...</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
