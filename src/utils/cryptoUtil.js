import { useEffect, useState } from 'react';
import JSEncrypt from 'jsencrypt';

const DataEncryption = () => {

  const [publicKey, setPublicKey] = useState(null);

  useEffect(() => {
    const fetchKey = async () => {
      try {
        const response = await fetch('/public_key.pem');
        const key = await response.text();
        setPublicKey(key);
      } catch (error) {
        console.error('Error fetching the public key:', error);
      }
    };
    fetchKey();
  }, []);

  const encryptedData = (data) => { 
     return CryptoJS.AES.encrypt(JSON.stringify(data), publicKey);
  }
}