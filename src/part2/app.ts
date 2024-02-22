import * as forge from 'node-forge';
import { decryptAES, encryptAES } from './aes';
import {
  decryptWithPrivateKey,
  encryptWithPublicKey,
  generateKeyPair,
} from './key-exchange';

const simulateCommunication = () => {
  // RSA/Asymmetric Cipher: Secret Key Exchange Protocol
  // Person A generates RSA key pair
  const { publicKey, privateKey } = generateKeyPair();

  // Person A generates a secret AES key for symmetric encryption
  const secretAESKey = forge.random.getBytesSync(16); // 16 bytes for AES-128
  const iv = forge.random.getBytesSync(16); // 16 bytes for CBC mode IV

  // Person A encrypts the AES key using Person B's public RSA key
  const encryptedAESKey = encryptWithPublicKey(publicKey, secretAESKey);

  // Person B receives the encrypted AES key and decrypts it using their private RSA key
  const decryptedAESKey = decryptWithPrivateKey(privateKey, encryptedAESKey);

  // AES/Triple DES: Modern Symmetric Cipher
  // Encryption and decryption using AES in CBC mode
  const originalMessage =
    'Hello, Person B! This is a longer message that spans multiple blocks in AES encryption.';
  const encryptedMessage = encryptAES(originalMessage, decryptedAESKey, iv);
  const decryptedMessage = decryptAES(encryptedMessage, decryptedAESKey, iv);

  console.log(`Original Message: ${originalMessage}`);
  console.log(`Encrypted Message: ${encryptedMessage}`);
  console.log(`Decrypted Message: ${decryptedMessage}\n\n\n`);

  // Demonstration of the effects of bit errors on the transmitted ciphertext
  // Simulate a bit error in the transmitted ciphertext
  const corruptedCiphertext =
    encryptedMessage.substring(0, encryptedMessage.length - 1) + '0'; // Change the last bit
  const decryptedCorruptedMessage = decryptAES(
    corruptedCiphertext,
    decryptedAESKey,
    iv,
  );

  console.log(`Corrupted Ciphertext: ${corruptedCiphertext}`);
  console.log(`Decrypted Corrupted Message: ${decryptedCorruptedMessage}`);
};

simulateCommunication();
