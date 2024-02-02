import { decryptAffineCipher, encryptAffineCipher } from './ciphers/affine';
import {
  decryptRailFenceCipher,
  encryptRailFenceCipher,
} from './ciphers/rail-fence';
import { measurePerformance } from './utils';

const NUM_RAILS = 3;

const TEXTS = [
  'Short Text',
  'This is a medium length text.',
  'This is a longer text to analyze the performance of the encryption and decryption functions over different lengths of plaintext.',
];

TEXTS.forEach((text) => {
  console.log(`Analyzing text: ${text}`);
  console.log(
    `Rail Fence Encryption Time: ${measurePerformance(encryptRailFenceCipher, text, NUM_RAILS)} ms`,
  );
  console.log(
    `Rail Fence Decryption Time: ${measurePerformance(decryptRailFenceCipher, text, NUM_RAILS)} ms\n`,
  );
  console.log(
    `Affine Encryption Time: ${measurePerformance(encryptAffineCipher, text)} ms`,
  );
  console.log(
    `Affine Decryption Time: ${measurePerformance(decryptAffineCipher, text)} ms\n`,
  );

  // Measure combined cipher
  const encryptedWithRailFence = encryptRailFenceCipher(text, NUM_RAILS);
  const encryptedWithAffine = encryptAffineCipher(encryptedWithRailFence);

  console.log(
    `Product Cipher Encryption Time: ${measurePerformance(encryptAffineCipher, encryptedWithRailFence)} ms`,
  );

  const decryptedWithAffine = decryptAffineCipher(encryptedWithAffine);
  console.log(
    `Product Cipher Decryption Time: ${measurePerformance(decryptRailFenceCipher, decryptedWithAffine, NUM_RAILS)} ms\n\n\n`,
  );
});
