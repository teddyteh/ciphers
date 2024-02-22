import { measurePerformance } from '../utils';
import { decryptAffineCipher, encryptAffineCipher } from './ciphers/affine';
import {
  decryptRailFenceCipher,
  encryptRailFenceCipher,
} from './ciphers/rail-fence';

const NUM_RAILS = 3;

const TEXTS = [
  'Short Text',
  'This is a medium length text.',
  'This is a longer text to analyze the performance of the encryption and decryption functions over different lengths of plaintext.',
];

TEXTS.forEach((text) => {
  console.log(`Analyzing text: ${text}`);

  const { timeTaken: timeTakenEncryptRailFence, output: encryptedRailFence } =
    measurePerformance(encryptRailFenceCipher, text, NUM_RAILS);
  console.log(`Rail Fence Encryption Time: ${timeTakenEncryptRailFence} ms`);

  const { timeTaken: timeTakenDecryptRailFence } = measurePerformance(
    decryptRailFenceCipher,
    encryptedRailFence,
    NUM_RAILS,
  );
  console.log(`Rail Fence Decryption Time: ${timeTakenDecryptRailFence} ms\n`);

  const { timeTaken: timeTakenEncryptAffine } = measurePerformance(
    encryptAffineCipher,
    text,
  );
  console.log(`Affine Encryption Time: ${timeTakenEncryptAffine} ms`);

  const { timeTaken: timeTakenDecryptAffine } = measurePerformance(
    decryptAffineCipher,
    text,
  );
  console.log(`Affine Decryption Time: ${timeTakenDecryptAffine} ms\n`);

  // Measure combined cipher
  const startTimeEncryptProductCipher = performance.now();
  const encryptedWithRailFence = encryptRailFenceCipher(text, NUM_RAILS);
  const encryptedWithAffine = encryptAffineCipher(encryptedWithRailFence);
  const endTimeEncryptProductCipher = performance.now();
  console.log(
    `Product Cipher Encrypt Total Time: ${endTimeEncryptProductCipher - startTimeEncryptProductCipher} ms`,
  );

  const startTimeDecryptProductCipher = performance.now();
  const decryptedWithAffine = decryptAffineCipher(encryptedWithAffine);
  const decryptedWithRailFence = decryptRailFenceCipher(
    decryptedWithAffine,
    NUM_RAILS,
  );
  const endTimeDecryptProductCipher = performance.now();
  console.log(
    `Product Cipher Decrypt Total Time: ${endTimeDecryptProductCipher - startTimeDecryptProductCipher} ms\n\n\n`,
  );
});
