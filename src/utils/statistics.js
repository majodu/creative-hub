import { openDB } from 'idb';

const DB_NAME = 'StatsDB';
const STORE_NAME = 'stats';

const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export const getStats = async () => {
  const db = await initDB();
  let stats = await db.get(STORE_NAME, 'appStats');
  if (!stats) {
    stats = {
      id: 'appStats',
      promptsCreated: 0,
      promptsShared: 0,
      chatMessagesSent: 0,
      promptsUsed: 0,
    };
    await db.put(STORE_NAME, stats);
  }
  return stats;
};

const updateStat = async (statName) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  const stats = await store.get('appStats') || {
    id: 'appStats',
    promptsCreated: 0,
    promptsShared: 0,
    chatMessagesSent: 0,
    promptsUsed: 0,
  };
  stats[statName]++;
  await store.put(stats);
  return stats;
};

export const incrementPromptsCreated = () => updateStat('promptsCreated');
export const incrementPromptsShared = () => updateStat('promptsShared');
export const incrementChatMessagesSent = () => updateStat('chatMessagesSent');
export const incrementPromptsUsed = () => updateStat('promptsUsed');
