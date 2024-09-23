import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key'; // In a real app, this should be securely managed

export const secureStore = {
  setItem: (key, value) => {
    const encryptedValue = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
    localStorage.setItem(key, encryptedValue);
  },
  getItem: (key) => {
    const encryptedValue = localStorage.getItem(key);
    if (encryptedValue) {
      const decryptedValue = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      return decryptedValue;
    }
    return null;
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
  }
};