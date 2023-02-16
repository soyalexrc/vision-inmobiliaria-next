import CryptoJS from "crypto-js";

export const masterCryptoKey = '123456$#@$^@1ERF'

export function decryptValue(keys: any, value: any): string {
  const key = CryptoJS.enc.Utf8.parse(keys);
  const iv = CryptoJS.enc.Utf8.parse(keys);
  const decrypted = CryptoJS.AES.decrypt(value, key, {
    keySize: 128 / 8,
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });


  return decrypted.toString(CryptoJS.enc.Utf8);
}

export function encryptValue(keys: any, value: any): string {
  const key = CryptoJS.enc.Utf8.parse(keys);
  const iv = CryptoJS.enc.Utf8.parse(keys);
  const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
      keySize: 128 / 8,
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

  return encrypted.toString();
}

