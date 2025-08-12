import CryptoJS from "crypto-js";

const secrekey = process.env.SECRET_KEY ? process.env.SECRET_KEY : "";

//encrypts sensitive data
export function encryptData(data: string) {
  return CryptoJS.AES.encrypt(data, secrekey).toString();
}

//decrypts sensitive data
export function decryptData(encData: string) {
  return CryptoJS.AES.decrypt(encData, secrekey).toString(CryptoJS.enc.Utf8);
}

/* This util file is in EncryptDecryptWithPlaywright.spec.ts file. secrekey needs to be declared in terminal before running test:

With Command Prompt:
set SECRET_KEY=wishinfinite
npx playwright test tests/EncryptDecrypt --project=firefox

With Poweshell:
$env:SECRET_KEY="wishinfinite"  //secret key can be anything. Depends on you.
npx playwright test tests/EncryptDecrypt --project=firefox
*/