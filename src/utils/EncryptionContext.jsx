import  { createContext, useState, useEffect, useContext } from 'react';
import { encryptionService } from './encryptionService'; // Import the encryption service

const EncryptionContext = createContext();

export const EncryptionProvider = ({ children }) => {
  const [isKeyLoaded, setIsKeyLoaded] = useState(false); // Track if the public key is loaded
  const [keyLoading, setKeyLoading] = useState(true); // Track if the app is loading

  useEffect(() => {
    const initializeEncryption = async () => {
      try {
        await encryptionService.loadPublicKey(); // Load public key on app startup
        setIsKeyLoaded(true); // Set flag to true when the key is loaded
      } catch (error) {
        console.error('Failed to initialize encryption:', error);
      } finally {
        setKeyLoading(false); // Set loading to false after initialization
      }
    };

    initializeEncryption(); // Call function when app mounts
  }, []);

  return (
    <EncryptionContext.Provider value={{ isKeyLoaded, keyLoading }}>
      {children}
    </EncryptionContext.Provider>
  );
};

export const useEncryption = () => useContext(EncryptionContext);
