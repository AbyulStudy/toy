const crypto = require('crypto');

const PASSWORD = 'AbyulPassword 입니당';
// 단방향 암호화
const oneWayEncryption = crypto.randomBytes(32, (err, buf) => {
  // 비밀번호 , salt, 반복 횟수, 비밀번호 길이, 해시 알고리즘
  crypto.pbkdf2(
    PASSWORD,
    buf.toString('base64'),
    1084326,
    32,
    'sha256',
    (err, key) => {
      console.log('단방향 암호화 : ', key.toString('base64'));
    }
  );
});
