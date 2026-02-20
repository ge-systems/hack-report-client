export interface EncryptedVault {
  iv: string;
  ciphertext: string;
}

/**
 * 1. KEY DERIVATION (PBKDF2)
 * Turns a weak user made password into a mathematically perfect 256-bit AES key.
 */
export async function deriveKey(password: string, saltBase64: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  
  // Step A: Import the password string as raw key material
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  // Convert our stored Base64 salt back into bytes
  const salt = Uint8Array.from(atob(saltBase64), c => c.charCodeAt(0));

  // Step C: Derive the AES-GCM key using 600,000 hashes
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 600000, // NIST Recommended minimum
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false, // false = The key cannot be extracted/exported by malicious JS!
    ["encrypt", "decrypt"]
  );
}

/**
 * 2. ENCRYPT DATA
 * Locks plaintext into an AES-GCM vault.
 */
export async function encryptVault(plaintext: string, cryptoKey: CryptoKey): Promise<string> {
  const enc = new TextEncoder();
  
  // Generate a cryptographically secure, random 12-byte IV for this specific encryption
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  // Encrypt the data
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    cryptoKey,
    enc.encode(plaintext)
  );

  // Pack the IV and Ciphertext into a single JSON string.
  // This is what gets saved to db
  const vaultData: EncryptedVault = {
    iv: btoa(String.fromCharCode(...new Uint8Array(iv))),
    ciphertext: btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer))),
  };

  return JSON.stringify(vaultData);
}

/**
 * 3. DECRYPT DATA
 * Unlocks the vault back into plaintext.
 */
export async function decryptVault(vaultString: string, cryptoKey: CryptoKey): Promise<string> {
  try {
    const vaultData: EncryptedVault = JSON.parse(vaultString);

    const iv = Uint8Array.from(atob(vaultData.iv), c => c.charCodeAt(0));
    const encryptedBuffer = Uint8Array.from(atob(vaultData.ciphertext), c => c.charCodeAt(0));

    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv },
      cryptoKey,
      encryptedBuffer
    );

    const dec = new TextDecoder();
    return dec.decode(decryptedBuffer);
  } catch (error) {
    console.error("Decryption failed. Invalid key or corrupted vault.", error);
    throw new Error("Decryption failed.");
  }
}