import React, { useState } from 'react';
import './AdminPanel.css';

function AdminPanel({ settings, setSettings }) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [saveStatus, setSaveStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalSettings((prev) => ({
      ...prev,
      [name]: name === 'temperature' || name === 'maxTokens' ? parseFloat(value) : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSettings(localSettings);
    setSaveStatus('Settings saved successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleReset = () => {
    const defaultSettings = {
      apiEndpoint: 'http://localhost:3001/api/chat',
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      maxTokens: 150
    };
    setLocalSettings(defaultSettings);
    setSettings(defaultSettings);
    setSaveStatus('Settings reset to defaults!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Admin Settings</h2>
      </div>

      <form className="settings-form" onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="apiEndpoint">API Endpoint</label>
          <input
            type="text"
            id="apiEndpoint"
            name="apiEndpoint"
            value={localSettings.apiEndpoint}
            onChange={handleChange}
            placeholder="http://localhost:3001/api/chat"
          />
          <span className="help-text">Backend API URL for LLM requests</span>
        </div>

        <div className="form-group">
          <label htmlFor="model">Model</label>
          <select
            id="model"
            name="model"
            value={localSettings.model}
            onChange={handleChange}
          >
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="gpt-4">GPT-4</option>
            <option value="claude-2">Claude 2</option>
            <option value="claude-3">Claude 3</option>
          </select>
          <span className="help-text">Select the LLM model to use</span>
        </div>

        <div className="form-group">
          <label htmlFor="temperature">
            Temperature: {localSettings.temperature}
          </label>
          <input
            type="range"
            id="temperature"
            name="temperature"
            min="0"
            max="2"
            step="0.1"
            value={localSettings.temperature}
            onChange={handleChange}
          />
          <span className="help-text">
            Controls randomness (0 = focused, 2 = creative)
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="maxTokens">Max Tokens</label>
          <input
            type="number"
            id="maxTokens"
            name="maxTokens"
            min="50"
            max="4000"
            step="50"
            value={localSettings.maxTokens}
            onChange={handleChange}
          />
          <span className="help-text">Maximum length of response</span>
        </div>

        {saveStatus && <div className="save-status">{saveStatus}</div>}

        <div className="form-actions">
          <button type="submit" className="save-button">
            Save Settings
          </button>
          <button
            type="button"
            className="reset-button"
            onClick={handleReset}
          >
            Reset to Defaults
          </button>
        </div>
      </form>

      <div className="info-section">
        <h3>Current Configuration</h3>
        <div className="config-display">
          <div className="config-item">
            <strong>Endpoint:</strong> {settings.apiEndpoint}
          </div>
          <div className="config-item">
            <strong>Model:</strong> {settings.model}
          </div>
          <div className="config-item">
            <strong>Temperature:</strong> {settings.temperature}
          </div>
          <div className="config-item">
            <strong>Max Tokens:</strong> {settings.maxTokens}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
