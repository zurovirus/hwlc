import { compare, hash } from "bcryptjs";
import NodeRSA from "node-rsa";

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export function encryptPassword(password) {
  const publicKeyString = process.env.PUBLIC_KEY;
  const publicKey = new NodeRSA(publicKeyString);
  const encrypted = publicKey.encrypt(password, "base64");

  return encrypted;
}

export function decryptPassword(password) {
  const privateKeyString = process.env.PRIVATE_KEY;
  console.log(privateKeyString);
  const privateKey = new NodeRSA(privateKeyString);
  const decrypted = privateKey.decrypt(password, "utf8");

  console.log(decrypted);
  return decrypted;
}
