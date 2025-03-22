export async function hashPassword(password: string) {
  const encoder = new TextEncoder();
  const saltBytes = crypto.getRandomValues(new Uint8Array(16)); // 16-byte salt
  const iterations = 100_000; // Increase for better security

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBytes,
      iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPassword = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Concatenate as a single string (argon2-like)
  return `pbkdf2$${iterations}$${Buffer.from(saltBytes).toString(
    "base64"
  )}$${hashedPassword}`;
}

export async function verifyPassword(password: string, storedHash: string) {
  const [algorithm, iterStr, salt, hash] = storedHash.split("$");

  if (algorithm !== "pbkdf2") {
    throw new Error("Unsupported hash format");
  }

  const iterations = parseInt(iterStr, 10);
  const saltBytes = new Uint8Array(Buffer.from(salt, "base64")); // Decode salt

  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBytes,
      iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const computedHash = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return computedHash === hash;
}
