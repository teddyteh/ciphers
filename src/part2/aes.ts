import * as forge from 'node-forge';

export const encryptAES = (plaintext: string, key: string): string => {
  const cipher = forge.cipher.createCipher('AES-ECB', key);
  cipher.start();
  cipher.update(forge.util.createBuffer(plaintext));
  cipher.finish();
  return forge.util.encode64(cipher.output.getBytes());
};

export const decryptAES = (ciphertext: string, key: string): string => {
  const decipher = forge.cipher.createDecipher('AES-ECB', key);
  decipher.start();
  decipher.update(forge.util.createBuffer(forge.util.decode64(ciphertext)));
  decipher.finish();
  return decipher.output.toString();
};
