import dotenv from 'dotenv';
import ConfigData from '../types/configData';

dotenv.config();

const configProd: ConfigData = {
  NODE_ENV: process.env.NODE_ENV || 'dev',
  HOST: process.env.PROD_HOST,
  PORT: process.env.PROD_PORT,
  DATABASE_URL: process.env.DATABASE_URL || '',
  JWT_SECRET_KEY: process.env.PROD_JWT_SECRET_KEY || '',
  PASSWORD: process.env.PROD_PASSWORD || '',
  EMAIL: process.env.PROD_EMAIL || '',
};

export default configProd;
