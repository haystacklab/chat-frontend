// api.js - Handles API calls to the backend

export const sendMessage = async (message, settings) => {
  try {
    const response = await fetch(settings.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        model: settings.model,
        temperature: settings.temperature,
        max_tokens: settings.maxTokens,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.message || 'Failed to send message');
  }
};

// Optional: Function to test API connection
export const testConnection = async (endpoint) => {
  try {
    const response = await fetch(`${endpoint}/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};
