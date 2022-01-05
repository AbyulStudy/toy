const crypto = require('crypto');

// 양방향 암호화

const ENCRYPTION_KEY = crypto
  .createHash('sha256')
  .update(String('salt'))
  .digest('base64')
  .substring(0, 32);
const IV_LENGTH = 16; // For AES, this is always 16
const PASSWORD = 'AbyulPassword 입니당';

function encrypt(text) {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(
    'aes-256-gcm',
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
}
const enoutput = encrypt(PASSWORD);
console.log('encrypt output : ', enoutput);
console.log('===========================================');

function decrypt(text) {
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let decrypted = decipher.update(encryptedText);

  // decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

const deoutput = decrypt(enoutput);
console.log('decrypt output : ', deoutput);
