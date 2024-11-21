import { twofish } from 'twofish';

const trimZeros = (buffer) => {
  let length = buffer.length;

  while (length > 0 && buffer[length - 1] === 0) {
    length--;
  }

  return buffer.slice(0, length);
};

const tf = twofish();

export default {
  encrypt: (text, key) => {
    const bufferKey = Array.from(Buffer.from(key));
    const bufferText = Array.from(Buffer.from(text, 'utf-8'));
    const encryptedBuffer = Buffer.from(tf.encrypt(bufferKey, bufferText));

    return encryptedBuffer.toString('base64');
  },

  decrypt: (encrypted, key) => {
    const bufferKey = Array.from(Buffer.from(key));
    const bufferEncrypted = Array.from(Buffer.from(encrypted, 'base64'));
    const decryptedBuffer = Buffer.from(tf.decrypt(bufferKey, bufferEncrypted));

    return trimZeros(decryptedBuffer).toString('utf-8');
  },
};
