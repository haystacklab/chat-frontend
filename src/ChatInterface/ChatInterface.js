import React, { useState, useRef, useEffect } from 'react';
import { sendMessage } from './api';
import './ChatInterface.css';

function ChatInterface({ settings }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendMessage(inputValue, settings);
      
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.message || response.content || 'No response',
        timestamp: new Date().toISOString()
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'error',
        content: `Error: ${error.message}`,
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h2>Chat</h2>
        <button className="clear-button" onClick={clearChat}>
          Clear Chat
        </button>
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <p>Start a conversation with the LLM</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.role}`}
            >
              <div className="message-role">
                {message.role === 'user' ? 'You' : message.role === 'error' ? 'Error' : 'Assistant'}
              </div>
              <div className="message-content">{message.content}</div>
              <div className="message-timestamp">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="message assistant loading">
            <div className="message-role">Assistant</div>
            <div className="message-content">
              <span className="typing-indicator">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="send-button"
          disabled={isLoading || !inputValue.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatInterface;
