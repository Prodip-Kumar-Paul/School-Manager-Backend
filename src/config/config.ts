import dotenv from 'dotenv';
import path from 'node:path';
import ConfigData from '../types/configData.js';

dotenv.config({
  path: path.join(__dirname, `config.${process.env.NODE_ENV?.trim()}.env`),
});
// console.log(
//    "ENV file path --> ",
//    path.join(__dirname, `config.${process.env.NODE_ENV.trim()}.env`)
// );

import configDev from './config.dev';
import configProd from './config.prod';

let config: ConfigData = { NODE_ENV: process.env.NODE_ENV?.trim() };

if (process.env.NODE_ENV?.trim() === 'dev') {
  config = { ...configDev };
} else if (process.env.NODE_ENV?.trim() === 'prod') {
  config = { ...configProd };
}
console.log(config);

export default config;
