import { openDB } from 'idb';

const dbName = 'PromptKeeperDB';
const storeName = 'prompts';

const initDB = async () => {
  return openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        store.createIndex('archivedAt', 'archivedAt');
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
    archivedAt: null,
  });
};

export const getAllPrompts = async (includeArchived = false) => {
  const db = await initDB();
  const prompts = await db.getAll(storeName);
  return includeArchived ? prompts : prompts.filter(prompt => !prompt.archivedAt);
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

export const archivePrompt = async (id) => {
  const db = await initDB();
  const prompt = await db.get(storeName, id);
  if (!prompt) {
    throw new Error('Prompt not found');
  }
  prompt.archivedAt = new Date().toISOString();
  return db.put(storeName, prompt);
};

export const unarchivePrompt = async (id) => {
  const db = await initDB();
  const prompt = await db.get(storeName, id);
  if (!prompt) {
    throw new Error('Prompt not found');
  }
  prompt.archivedAt = null;
  return db.put(storeName, prompt);
};

export const getArchivedPrompts = async () => {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);
  const index = store.index('archivedAt');
  return index.getAll(IDBKeyRange.lowerBound(new Date(0)));
};
