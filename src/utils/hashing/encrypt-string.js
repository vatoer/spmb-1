import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.AUTH_SECRET;
const SIGNING_KEY = process.env.SIGNING_KEY; // HMAC Key (For Signature)

function roundToNearestInterval(intervalInSeconds = 300) {
  return Math.ceil(Date.now() / (intervalInSeconds * 1000)) * intervalInSeconds;
}

export function generateToken(string) {
  const expiry = roundToNearestInterval(300); // Rounds to nearest 5 minutes
  const payload = `${string}.${expiry}`;
  const signature = CryptoJS.HmacSHA256(payload, SECRET_KEY).toString(
    CryptoJS.enc.Base64
  );
  return btoa(`${payload}.${signature}`)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// 🔓 Validate & Decode Token
export function validateToken(token) {
  try {
    // Convert back from Base64
    const decoded = atob(token.replace(/-/g, "+").replace(/_/g, "/"));

    // Find the last dot (.) to properly split the signature
    const lastDotIndex = decoded.lastIndexOf(".");
    if (lastDotIndex === -1) throw new Error("Malformed token");

    const payload = decoded.slice(0, lastDotIndex);
    const signature = decoded.slice(lastDotIndex + 1);

    // Extract string and expiry from payload
    const [string, expiry] = payload.split(".");
    if (!string || !expiry) throw new Error("Invalid payload format");

    // Check expiry
    if (Date.now() / 1000 > Number(expiry)) {
      throw new Error("Expired token");
    }

    // Validate HMAC Signature
    const expectedSignature = CryptoJS.HmacSHA256(payload, SECRET_KEY).toString(
      CryptoJS.enc.Base64
    );

    if (signature !== expectedSignature) {
      throw new Error("Invalid signature");
    }

    return string; // Return the original string stored in the token
  } catch (error) {
    console.error("Invalid or expired token:", error.message);
    return null;
  }
}

// 🔐 Encrypt NIK with Expiry & Nonce
export function encryptString(string) {
  const expiry = Date.now() + 5 * 60 * 1000; // Expire in 5 mins
  const nonce = CryptoJS.lib.WordArray.random(16).toString(); // Random 16-byte nonce
  const data = JSON.stringify({ string, expiry, nonce });

  // AES Encryption
  const encrypted = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();

  // HMAC Signature to prevent tampering
  const signature = CryptoJS.HmacSHA256(encrypted, SIGNING_KEY).toString();

  // Encode as URL-safe
  return encodeURIComponent(btoa(`${encrypted}:${signature}`));
}

// 🔓 Decrypt NIK & Validate Expiry
export function decryptString(encryptedData) {
  try {
    const decoded = atob(decodeURIComponent(encryptedData));
    const [encrypted, signature] = decoded.split(":");

    // Validate HMAC Signature
    const validSignature = CryptoJS.HmacSHA256(
      encrypted,
      SIGNING_KEY
    ).toString();
    if (signature !== validSignature) {
      throw new Error("Tampered URL detected!");
    }

    // Decrypt AES Data
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    // Expiry Check
    if (Date.now() > decrypted.expiry) {
      throw new Error("Expired token");
    }

    return decrypted.nik;
  } catch (error) {
    console.error("Invalid or expired NIK:", error.message);
    return null;
  }
}
