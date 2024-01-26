import { decryptAffineCipher, encryptAffineCipher } from './ciphers/affine';
import {
  decryptRailFenceCipher,
  encryptRailFenceCipher,
} from './ciphers/rail-fence';

const text = 'HELLOOOO';
const numRails = 3;

// Encrypt
const railFenceEncrypted = encryptRailFenceCipher(text, numRails);
console.info(`Rail Fence Encrypted: ${railFenceEncrypted}`);
const finalEncrypted = encryptAffineCipher(railFenceEncrypted);
console.info(`Final Encrypted: ${finalEncrypted}`);

// Decrypt
const affineDecrypted = decryptAffineCipher(finalEncrypted);
console.info(`Affine Decrypted: ${affineDecrypted}`);
const finalDecrypted = decryptRailFenceCipher(affineDecrypted, numRails);
console.info(`Final Decrypted: ${finalDecrypted}`);
