'use client';

import { useState, useRef, useEffect } from 'react';
import { Message } from '@/lib/types';

interface ChatSectionProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export default function ChatSection({ messages, onSendMessage }: ChatSectionProps) {
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="content-section active">
      <div className="section-header">
        <h1>Mental Health Companion</h1>
        <p>A safe space to talk, reflect, and grow</p>
      </div>

      <div className="chat-container" ref={chatContainerRef}>
        <div className="message bot-message">
          <div className="message-content">
            <p>
              Hello! I'm here to listen and support you. Feel free to share what's on
              your mind. Remember, this is a safe space.
            </p>
          </div>
        </div>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-content">
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          className="chat-input"
          placeholder="Share your thoughts..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          autoComplete="off"
        />
        <button className="send-btn" onClick={handleSend}>
          Send
        </button>
      </div>
    </section>
  );
}
