import { openDB } from 'idb';

const dbName = 'PromptKeeperDB';
const storeName = 'prompts';

const initDB = async () => {
  return openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const savePrompt = async (promptData) => {
  const db = await initDB();
  return db.add(storeName, {
    ...promptData,
    createdAt: new Date().toISOString(),
    versions: [promptData.prompt],
  });
};

export const getAllPrompts = async () => {
  const db = await initDB();
  return db.getAll(storeName);
};

export const getPromptById = async (id) => {
  const db = await initDB();
  return db.get(storeName, id);
};

export const updatePrompt = async (prompt) => {
  const db = await initDB();
  const existingPrompt = await db.get(storeName, prompt.id);
  if (!existingPrompt) {
    throw new Error('Prompt not found');
  }
  const updatedPrompt = {
    ...existingPrompt,
    ...prompt,
    versions: prompt.versions || [...(existingPrompt.versions || []), prompt.prompt],
  };
  return db.put(storeName, updatedPrompt);
};

export const deletePrompt = async (id) => {
  const db = await initDB();
  return db.delete(storeName, id);
};
