/**
 * This file handles password encryption and decryption
 */
import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('7061737323313233');
const _iv = CryptoJS.enc.Utf8.parse('7061737323313233');

const passwordToBeEncrypted = process.argv[2];

/**
 * This method encrypts password using crypto js configuration
 */
const encrypted: CryptoJS.WordArray = CryptoJS.AES.encrypt(
  CryptoJS.enc.Utf8.parse(passwordToBeEncrypted),
  key,
  {
    keySize: 128 / 8,
    iv: _iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }
);

/**
 * This method decrypts encrypted password to UTF string
 * @param encryptedString
 */
export const decrypted = (encryptedString: string) => {
  return CryptoJS.AES.decrypt(encryptedString, key, {
    keySize: 128 / 8,
    iv: _iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);
};

if (process.argv[1].includes('password')) {
  console.log(`Encrypted Password is ${encrypted}\n`);
}
