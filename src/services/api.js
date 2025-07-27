// src/services/api.js
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000') + '/api';

export const fetchConfig = async () => {
    const response = await fetch(`${API_BASE_URL}/config`);
    if (!response.ok) throw new Error('Failed to fetch config');
    return response.json();
};

export const updateConfig = async (config) => {
    const response = await fetch(`${API_BASE_URL}/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
    });
    if (!response.ok) throw new Error('Failed to update config');
    return response.json();
};

export const postChatMessage = async (prompt) => {
    const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
    });
    if (!response.ok) throw new Error('Failed to send message');
    return response.json();
};

export const resetChat = async () => {
    const response = await fetch(`${API_BASE_URL}/reset`, { method: 'POST' });
    if (!response.ok) throw new Error('Failed to reset chat');
    return response.json();
};
