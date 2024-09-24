import { openDB } from 'idb';

const dbName = 'PromptKeeperDB';
const storeName = 'prompts';

const initDB = async () => {
  return openDB(dbName, 2, {
    upgrade(db, oldVersion, newVersion, transaction) {
      const store = db.objectStoreNames.contains(storeName)
        ? transaction.objectStore(storeName)
        : db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      
      if (!store.indexNames.contains('archivedAt')) {
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

export const getArchivedPrompts = async (searchTerm = '') => {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);
  const index = store.index('archivedAt');
  const archivedPrompts = await index.getAll(IDBKeyRange.lowerBound(new Date(0)));
  
  if (searchTerm) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return archivedPrompts.filter(prompt => 
      prompt.title.toLowerCase().includes(lowerSearchTerm) ||
      prompt.prompt.toLowerCase().includes(lowerSearchTerm) ||
      prompt.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))
    );
  }
  
  return archivedPrompts;
};

export const getRecentlyArchivedPrompts = async (limit = 5) => {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);
  const index = store.index('archivedAt');
  const archivedPrompts = await index.getAll(IDBKeyRange.lowerBound(new Date(0)));
  
  return archivedPrompts
    .sort((a, b) => new Date(b.archivedAt) - new Date(a.archivedAt))
    .slice(0, limit);
};

export const deletePrompt = async (id) => {
  const db = await initDB();
  return db.delete(storeName, id);
};
