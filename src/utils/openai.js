import { secureStore } from './secureStorage';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const generateOpenAIResponse = async (userInput) => {
  const apiKey = await secureStore.getItem('openaiKey');
  const defaultPrompt = await secureStore.getItem('defaultPrompt') || '';

  if (!apiKey) {
    throw new Error('OpenAI API key not found. Please set it in the Settings page.');
  }

  const fullPrompt = `${defaultPrompt}\n\nUser: ${userInput}`;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: fullPrompt }],
        max_tokens: 150
      })
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid OpenAI API key. Please check your API key in the Settings page.');
      }
      throw new Error('Failed to generate response from OpenAI');
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    throw error;
  }
};

export const generateOpenAIResponseForChatPage = async (userInput) => {
  const apiKey = await secureStore.getItem('openaiKey');

  if (!apiKey) {
    throw new Error('OpenAI API key not found. Please set it in the Settings page.');
  }

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userInput }],
        max_tokens: 150
      })
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid OpenAI API key. Please check your API key in the Settings page.');
      }
      throw new Error('Failed to generate response from OpenAI');
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    throw error;
  }
};
