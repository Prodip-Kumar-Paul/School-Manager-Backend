import dotenv from 'dotenv';
import path from 'node:path';
import ConfigData from '../types/configData';

dotenv.config({
  path: path.join(
    __dirname,
    `config.${process.env.NODE_ENV || 'dev'?.trim()}.env`,
  ),
});

const configDev: ConfigData = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME,
  DB_URL: process.env.DB_URL,
  DB_PASSWORD: process.env.DB_PASSWORD,
};

export default configDev;
