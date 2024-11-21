import CryptoJS from 'crypto-js';

export default {
  encrypt: (text, key) => CryptoJS.DES.encrypt(text, key).toString(),
  decrypt: (encrypted, key) => CryptoJS.DES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8),
};
