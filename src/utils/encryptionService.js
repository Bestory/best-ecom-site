
class EncryptionService {
  constructor() {
    this.publicKey = null; // Stores the public key
  }

  // Load the public key from the server
  async loadPublicKey() {
    if (this.publicKey) {
      return; // Public key is already loaded
    }

    try {
      const response = await fetch('/api/public-key'); // Fetch once from the server
      this.publicKey = await response.text(); // Store the public key in memory
      console.log('Public key loaded successfully.');
    } catch (error) {
      console.error('Error fetching the public key:', error);
      throw new Error('Failed to load the public key.');
    }

     // Convert PEM to binary format
  const binary = window.atob(this.publicKey.replace(/(-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----|\s+)/g, ''));
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

      // Import the public key
    this.publicKey = await window.crypto.subtle.importKey(
      "spki",
      bytes.buffer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256"
      },
      true, // Extractable
      ["encrypt"]
    );
  }

  // Function to encrypt data
  async encryptData(data) {
    // confirm public key availability
    if (!this.publicKey) {
      console.error('Public key not loaded yet.');
      return null;
    }
  
    // Generate a random AES key (256-bit)
    const aesKey = await window.crypto.subtle.generateKey(
      {
        name: "AES-CBC",
        length: 256, // AES-256
      },
      true, // The key is extractable so it can be encrypted with RSA
      ["encrypt", "decrypt"]
    );
    // Generate a random initialization vector (IV) for AES
    const iv = window.crypto.getRandomValues(new Uint8Array(16)); // AES block size is 16 bytes

    // Convert the data to ArrayBuffer (required by Web Crypto API)
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);
    
    // Encrypt the data using AES-CBC
    const encryptedDataBuffer = await window.crypto.subtle.encrypt(
      {
        name: "AES-CBC",
        iv: iv
      },
      aesKey,
      encodedData
    );
    
    // Export the AES key so that it can be encrypted with RSA
    const aesKeyBuffer = await window.crypto.subtle.exportKey('raw', aesKey);
     
    //Encrypt the AES key using the fetched RSA public key (RSA-OAEP)
    const encryptedAESKey = await window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP"
      },
      this.publicKey,
      aesKeyBuffer
    );

    //Convert everything to Base64 for easy transmission
    const encryptedData = window.btoa(String.fromCharCode(...new Uint8Array(encryptedDataBuffer)));
    const encryptedKey = window.btoa(String.fromCharCode(...new Uint8Array(encryptedAESKey)));
    const ivBase64 = window.btoa(String.fromCharCode(...iv));
    // Return the encrypted AES key, encrypted data, and the IV
    return {
      encryptedKey: encryptedKey, // AES key encrypted with RSA public key
      encryptedData: encryptedData, // Data encrypted with AES
      iv: ivBase64 // Initialization vector
    };
  }
}
export const encryptionService = new EncryptionService(); // Export an instance
