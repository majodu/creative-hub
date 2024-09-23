const generateKey = async () => {
  const key = await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
  const exportedKey = await window.crypto.subtle.exportKey('raw', key);
  const keyString = btoa(String.fromCharCode.apply(null, new Uint8Array(exportedKey)));
  localStorage.setItem('encryptionKey', keyString);
  return key;
};

const getKey = async () => {
  const keyString = localStorage.getItem('encryptionKey');
  if (!keyString) {
    return generateKey();
  }
  const keyBuffer = Uint8Array.from(atob(keyString), c => c.charCodeAt(0));
  return window.crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
};

const encrypt = async (data) => {
  const key = await getKey();
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encodedData = new TextEncoder().encode(data);
  const encryptedData = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    encodedData
  );
  const encryptedArray = new Uint8Array(encryptedData);
  const resultArray = new Uint8Array(iv.length + encryptedArray.length);
  resultArray.set(iv);
  resultArray.set(encryptedArray, iv.length);
  return btoa(String.fromCharCode.apply(null, resultArray));
};

const decrypt = async (encryptedData) => {
  const key = await getKey();
  const dataArray = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
  const iv = dataArray.slice(0, 12);
  const data = dataArray.slice(12);
  const decryptedData = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    data
  );
  return new TextDecoder().decode(decryptedData);
};

export const secureStore = {
  setItem: async (key, value) => {
    const encryptedValue = await encrypt(value);
    localStorage.setItem(key, encryptedValue);
  },
  getItem: async (key) => {
    const encryptedValue = localStorage.getItem(key);
    if (encryptedValue) {
      return decrypt(encryptedValue);
    }
    return null;
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
  }
};
