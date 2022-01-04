require('dotenv').config();

module.exports = {
  HOST: process.env.DATABASE_HOST,
  USER: process.env.DATABASE_USER,
  PASSWORD: process.env.DATABASE_PASSWORD,
  DB: process.env.DATABASE_DB,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000, // 연결이 해제되기 전에 유휴 상태일 수 있는 최대 시간
    idle: 10000, // 해당 풀이 오류를 던지기 전에 연결을 시도하는 최대 시간
  },
};
