import * as forge from 'node-forge';

export const generateKeyPair = (): forge.pki.rsa.KeyPair => {
  const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
  return keyPair;
};

export const encryptWithPublicKey = (
  publicKey: forge.pki.rsa.PublicKey,
  secret: string,
): string => {
  const encrypted = publicKey.encrypt(secret, 'RSA-OAEP');
  return forge.util.encode64(encrypted);
};

export const decryptWithPrivateKey = (
  privateKey: forge.pki.rsa.PrivateKey,
  encrypted: string,
): string => {
  const decrypted = privateKey.decrypt(
    forge.util.decode64(encrypted),
    'RSA-OAEP',
  );
  return decrypted;
};
