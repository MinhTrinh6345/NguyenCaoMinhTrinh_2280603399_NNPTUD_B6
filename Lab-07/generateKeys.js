const crypto = require('crypto');
const fs = require('fs');

// Generate RSA key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

// Write to files
fs.writeFileSync('private_key.pem', privateKey);
fs.writeFileSync('public_key.pem', publicKey);

console.log('Keys generated successfully!');
console.log('Private key saved to: private_key.pem');
console.log('Public key saved to: public_key.pem');
