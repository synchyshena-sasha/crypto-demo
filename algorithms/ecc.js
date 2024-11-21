import eccrypto from 'eccrypto';

const privateKey = eccrypto.generatePrivate();
const publicKey = eccrypto.getPublic(privateKey);

export default {
  encrypt: async (text) => {
    const encrypted = await eccrypto.encrypt(publicKey, Buffer.from(text));

    return Buffer.from(JSON.stringify(encrypted)).toString('base64');
  },
  decrypt: async (encrypted) => {
    const encryptedObj = JSON.parse(Buffer.from(encrypted, 'base64').toString());

    encryptedObj.iv = Buffer.from(encryptedObj.iv.data);
    encryptedObj.ephemPublicKey = Buffer.from(encryptedObj.ephemPublicKey.data);
    encryptedObj.ciphertext = Buffer.from(encryptedObj.ciphertext.data);
    encryptedObj.mac = Buffer.from(encryptedObj.mac.data);

    const decrypted = await eccrypto.decrypt(privateKey, encryptedObj);
    return decrypted.toString('utf-8');
  },
};
