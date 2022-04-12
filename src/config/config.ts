import ConfigData from '../types/configData.js';

import configDev from './config.dev';
import configProd from './config.prod';

let config: ConfigData = { ...configDev };

if (process.env.NODE_ENV?.trim() === 'prod') {
  config = { ...configProd };
}
// eslint-disable-next-line no-console
// console.log(config);

export default config;
