import React, { useState } from 'react';
import ChatInterface from './ChatInterface/ChatInterface';
import AdminPanel from './AdminPanel/AdminPanel';
import './App.css';

const apiEndpoint = 'http://app-1/chat';


function App() {
  const [currentView, setCurrentView] = useState('chat');
  const [settings, setSettings] = useState({
    apiEndpoint: apiEndpoint,
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 150
  });

  return (
    <div className="App">
      <header className="app-header">
        <h1>LLM Chat Interface</h1>
        <nav className="navigation">
          <button
            className={currentView === 'chat' ? 'active' : ''}
            onClick={() => setCurrentView('chat')}
          >
            Chat
          </button>
          <button
            className={currentView === 'admin' ? 'active' : ''}
            onClick={() => setCurrentView('admin')}
          >
            Admin
          </button>
        </nav>
      </header>

      <main className="main-content">
        {currentView === 'chat' ? (
          <ChatInterface settings={settings} />
        ) : (
          <AdminPanel settings={settings} setSettings={setSettings} />
        )}
      </main>
    </div>
  );
}

export default App;
