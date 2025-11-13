'use client';

import { useMemo } from 'react';
import { getInsights } from '@/lib/api';
import { AppData } from '@/lib/types';

interface InsightsSectionProps {
  data: AppData;
}

export default function InsightsSection({ data }: InsightsSectionProps) {
  const insights = useMemo(() => {
    return getInsights();
  }, [data]);

  return (
    <section className="content-section active">
      <div className="section-header">
        <h1>Insights & Patterns</h1>
        <p>Understand your mental wellness journey</p>
      </div>

      <div className="insights-grid">
        <div className="insight-card">
          <div className="insight-header">
            <h3>Average Mood</h3>
          </div>
          <div className="insight-value">{insights.averageMood}</div>
          <p className="insight-description">This week</p>
        </div>

        <div className="insight-card">
          <div className="insight-header">
            <h3>Journal Entries</h3>
          </div>
          <div className="insight-value">{insights.entryCount}</div>
          <p className="insight-description">Total written</p>
        </div>

        <div className="insight-card">
          <div className="insight-header">
            <h3>Mood Logs</h3>
          </div>
          <div className="insight-value">{insights.moodCount}</div>
          <p className="insight-description">This week</p>
        </div>

        <div className="insight-card">
          <div className="insight-header">
            <h3>Consistency</h3>
          </div>
          <div className="insight-value">{insights.streakDays}</div>
          <p className="insight-description">Day streak</p>
        </div>
      </div>

      <div className="triggers-section">
        <h2>Common Mood Triggers</h2>
        <div className="triggers-list">
          {insights.triggers.length > 0 ? (
            insights.triggers.map((trigger, index) => (
              <span key={index} className="trigger-tag">
                {trigger}
              </span>
            ))
          ) : (
            <p className="empty-state">Log moods with notes to see patterns</p>
          )}
        </div>
      </div>
    </section>
  );
}
