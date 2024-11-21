import { Blowfish } from 'javascript-blowfish';

export default {
  encrypt: (text, key) => {
    const bf = new Blowfish(key);
    return bf.base64Encode(bf.encrypt(text));
  },
  decrypt: (encrypted, key) => {
    const bf = new Blowfish(key);
    const decrypted = bf.decrypt(bf.base64Decode(encrypted));
    return bf.trimZeros(decrypted);
  },
};
