import dotenv from 'dotenv';
import path from 'node:path';
import ConfigData from '../types/configData';

const ENV = process.env.NODE_ENV || 'dev';

dotenv.config({
  path: path.join(__dirname, `config.${ENV?.trim()}.env`),
});

// console.log(
//   'ENV file path --> ',
//   path.join(__dirname, `config.${ENV?.trim()}.env`),
// );

const configDev: ConfigData = {
  NODE_ENV: process.env.NODE_ENV || 'dev',
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  DB_TYPE: process.env.DB_TYPE || '',
  DB_NAME: process.env.DB_NAME || '',
  DB_USER: process.env.DB_USER || '',
  DB_PORT: process.env.DB_PORT || '',
  DB_HOST: process.env.DB_HOST || '',
  DB_URL: process.env.DB_URL || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
};

export default configDev;
