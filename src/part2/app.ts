import * as forge from 'node-forge';
import { measurePerformance } from '../utils';
import { decryptAES, encryptAES } from './aes';
import {
  decryptWithPrivateKey,
  encryptWithPublicKey,
  generateKeyPair,
} from './key-exchange';

const simulateCommunication = () => {
  // Person A generates RSA key pair
  const { publicKey, privateKey } = generateKeyPair();

  // Person A generates a secret AES key
  const secretAESKey = forge.random.getBytesSync(16); // AES key size is 16 bytes for AES-128

  // Person A sends the AES key to Person B securely using Person B's public key
  const encryptedAESKey = encryptWithPublicKey(publicKey, secretAESKey);

  // Person B receives the AES key and decrypts it using their private key
  const decryptedAESKey = decryptWithPrivateKey(privateKey, encryptedAESKey);

  console.log(`Original AES Key: ${secretAESKey}`);
  console.log(`Encrypted AES Key: ${encryptedAESKey}`);
  console.log(`Decrypted AES Key: ${decryptedAESKey}`);

  // Person A encrypts a message
  const originalMessage = 'Hello, Person B!';
  const encryptionTime = measurePerformance(
    encryptAES,
    originalMessage,
    decryptedAESKey,
  );
  const encryptedMessage = encryptAES(originalMessage, decryptedAESKey);

  // Person B decrypts the message
  const decryptionTime = measurePerformance(
    decryptAES,
    encryptedMessage,
    decryptedAESKey,
  );
  const decryptedMessage = decryptAES(encryptedMessage, decryptedAESKey);

  console.log(`Original Message: ${originalMessage}`);
  console.log(`Encrypted Message: ${encryptedMessage}`);
  console.log(`Decrypted Message: ${decryptedMessage}`);
  console.log(`Encryption Time: ${encryptionTime} milliseconds`);
  console.log(`Decryption Time: ${decryptionTime} milliseconds`);
};

simulateCommunication();
