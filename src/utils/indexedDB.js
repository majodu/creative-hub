import { openDB } from 'idb';
import { incrementPromptsCreated, incrementPromptsUsed } from './statistics';

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

const createDefaultPrompt = async (db) => {
  const defaultPrompt = {
    title: "Tweet Classifier",
    tags: ["classifier"],
    prompt: `<Inputs>
<tweet_text>{$TWEET_TEXT}
<classifications>{$CLASSIFICATIONS}
</Inputs>

<Instructions Structure>
1. Begin with the tweet text variable to ensure context is clear.
2. Follow with the classifications variable.
3. Provide clear instructions on how to classify the tweet based on the information provided.
4. Include a section for reasoning before the final classification output.
</Instructions Structure>

<Instructions>
You are going to classify a tweet based on the provided tweet text and classifications.

Here is the tweet text:
<tweet_text>
{$TWEET_TEXT}
</tweet_text>

And here are the given classifications for this tweet:
<classifications>
{$CLASSIFICATIONS}
</classifications>

Before assigning a final classification, please analyze the tweet text in relation to the classifications provided. Think about how the content of the tweet aligns with the various categories it could fit into. 

Please provide your reasoning for the chosen classification first, followed by the classification itself. Structure your final response as follows:
<answer>
Reasoning: [Your reasoning here]
Classification: [Your chosen classification here]
</answer>
</Instructions>`,
    createdAt: new Date().toISOString(),
    versions: [],
    archivedAt: null,
  };

  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.add(defaultPrompt);
  await tx.done;
};

const ensureDefaultPrompt = async (db) => {
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);
  const count = await store.count();
  if (count === 0) {
    await createDefaultPrompt(db);
  }
};

export const savePrompt = async (promptData) => {
  const db = await initDB();
  await ensureDefaultPrompt(db);
  const result = await db.add(storeName, {
    ...promptData,
    createdAt: new Date().toISOString(),
    versions: [promptData.prompt],
    archivedAt: null,
  });
  await incrementPromptsCreated();
  return result;
};

export const getAllPrompts = async (includeArchived = false) => {
  const db = await initDB();
  await ensureDefaultPrompt(db);
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

export const deletePrompt = async (id) => {
  const db = await initDB();
  return db.delete(storeName, id);
};

export const usePrompt = async (id) => {
  // Implement prompt usage logic here
  await incrementPromptsUsed();
};
