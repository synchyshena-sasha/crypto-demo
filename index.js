import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'url';
import AES from './algorithms/aes.js';
import Blowfish from './algorithms/blowfish.js';
import DES from './algorithms/des.js';
import ECC from './algorithms/ecc.js';
import RSA from './algorithms/rsa.js';
import Twofish from './algorithms/twofish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '/static')));

const getAlgorithmByKeyword = (keyword) => {
  switch (keyword.toLowerCase()) {
    case 'aes':
      return AES;
    case 'des':
      return DES;
    case 'twofish':
      return Twofish;
    case 'blowfish':
      return Blowfish;
    case 'rsa':
      return RSA;
    case 'ecc':
      return ECC;
    default:
      return null;
  }
};

app.post('/encrypt/:algorithm', async (req, res) => {
  const algorithm = getAlgorithmByKeyword(req.params.algorithm);

  if (!algorithm) {
    return res.status(404).json({});
  }

  res.json({ encrypted: await algorithm.encrypt(req.body.text, 'key') });
});

app.post('/decrypt/:algorithm', async (req, res) => {
  const algorithm = getAlgorithmByKeyword(req.params.algorithm);

  if (!algorithm) {
    return res.status(404).json({});
  }

  res.json({ decrypted: await algorithm.decrypt(req.body.encrypted, 'key') });
});

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log(`Listening at port ${port}...`);
});
