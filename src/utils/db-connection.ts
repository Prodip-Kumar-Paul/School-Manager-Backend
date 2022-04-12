import { Sequelize } from 'sequelize';
import config from '../config/config';

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
);

sequelize
  .authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
    // alter: true, force: true

    sequelize
      .sync({ alter: { drop: false }, force: false })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('synched with database...');
      })
      .catch((errors: unknown) => {
        // eslint-disable-next-line no-console, @typescript-eslint/restrict-plus-operands
        console.log('Unable to synch...' + errors);
      });
  })
  // esling-disable-next-line @typescript-eslint/no-explicit-any
  .catch((err: unknown) => {
    // eslint-disable-next-line no-console
    console.log('Unable to connect to the database:', err);
  });

export default sequelize;

global.sequelize = sequelize;
