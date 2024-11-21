import cryptico from 'cryptico';

export default {
  encrypt: (text, key) => {
    const rsaKey = cryptico.generateRSAKey(key, 1024);
    const publicKeyString = cryptico.publicKeyString(rsaKey);

    return cryptico.encrypt(text, publicKeyString).cipher;
  },
  decrypt: (encrypted, key) => {
    const rsaKey = cryptico.generateRSAKey(key, 1024);

    return cryptico.decrypt(encrypted, rsaKey).plaintext;
  },
};
