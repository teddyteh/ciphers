import * as forge from 'node-forge';

export const encryptAES = (
  plaintext: string,
  key: string,
  iv: string,
): string => {
  const cipher = forge.cipher.createCipher('AES-CBC', key);
  cipher.start({ iv });
  cipher.update(forge.util.createBuffer(plaintext));
  cipher.finish();
  return cipher.output.toHex();
};

export const decryptAES = (
  ciphertext: string,
  key: string,
  iv: string,
): string => {
  try {
    const decipher = forge.cipher.createDecipher('AES-CBC', key);
    decipher.start({ iv: iv });
    decipher.update(forge.util.createBuffer(forge.util.hexToBytes(ciphertext)));
    decipher.finish();
    return decipher.output.toString();
  } catch (error: any) {
    return 'Decryption error: ' + error.message;
  }
};
