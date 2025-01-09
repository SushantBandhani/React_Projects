export function generateSalt(length = 16): string {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array); 
    return Array.from(array)
      .map(byte => byte.toString(16).padStart(2, '0')) 
      .join(''); 
}

export async function deriveKey(password:string, salt:string) {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    const saltBuffer = encoder.encode(salt);
      const keyMaterial = await crypto.subtle.importKey(
      "raw",
      passwordBuffer,
      "PBKDF2",
      false,
      ["deriveBits", "deriveKey"]
    );
  
    const derivedKey = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: saltBuffer,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      256 
    );
  
    const keyArray = Array.from(new Uint8Array(derivedKey));
    return keyArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
  }

export async function verifyPassword(inputPassword:string, storedHash:string, storedSalt:string) {
    const derivedHash = await deriveKey(inputPassword, storedSalt);
    return derivedHash === storedHash;
}
