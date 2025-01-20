import { type CipherGCM, type DecipherGCM, createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

export type EncryptedData = {
  encrypted: string;
  iv: string;
  tag: string;
};

export type EncryptionOptions = {
  algorithm: string;
  key: Buffer;
  ivLength: number;
};

const encrypt = (data: string, options: EncryptionOptions): EncryptedData => {
  const iv = randomBytes(12) as Buffer;
  const cipher = createCipheriv(options.algorithm, new Uint8Array(options.key), new Uint8Array(iv)) as CipherGCM;

  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return {
    encrypted,
    iv: iv.toString('hex'),
    tag: cipher.getAuthTag().toString('hex'),
  };
};

const decrypt = (encryptedData: EncryptedData, options: EncryptionOptions): string => {
  const iv = new Uint8Array(Buffer.from(encryptedData.iv, 'hex'));
  const decipher = createDecipheriv(options.algorithm, new Uint8Array(options.key), iv) as DecipherGCM;

  decipher.setAuthTag(new Uint8Array(Buffer.from(encryptedData.tag, 'hex')));

  let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

export const encryptionUtils = {
  encrypt,
  decrypt,
};
