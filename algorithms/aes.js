import CryptoJS from 'crypto-js';

export default {
  encrypt: (text, key) => CryptoJS.AES.encrypt(text, key).toString(),
  decrypt: (encrypted, key) => CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8),
};
