import dotenv from 'dotenv';
import ConfigData from '../types/configData';

dotenv.config();

const configDev: ConfigData = {
  NODE_ENV: process.env.NODE_ENV || 'dev',
  HOST: process.env.DEV_HOST,
  PORT: process.env.DEV_PORT,
  DATABASE_URL: process.env.DATABASE_URL || '',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || '',
  PASSWORD: process.env.DEV_PASSWORD || '',
  EMAIL: process.env.DEV_EMAIL || '',
};

export default configDev;
