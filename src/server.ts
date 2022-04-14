import { PrismaClient } from '@prisma/client';
import config from './config/config';

process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);
  process.exit(1);
});

import app from './app';

/*
 * DB connection
 */

// import './utils/db-connection';

const prisma = new PrismaClient({
  errorFormat: 'pretty',
  rejectOnNotFound: true,
  log: ['query', 'info', 'warn'],
});

prisma
  .$connect()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('DB connected successfully!');
  })
  // eslint-disable-next-line no-console
  .catch((err: Error) => console.log(err));

const port = process.env.PORT || config.PORT || 8080;
const ENV = config.NODE_ENV || 'dev';
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Server started on PORT: ${port} in ${ENV.trim().toUpperCase()} mode`,
  );
});

process.on('unhandledRejection', (err: Error) => {
  // eslint-disable-next-line no-console
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  // eslint-disable-next-line no-console
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    // eslint-disable-next-line no-console
    console.log('💥 Process terminated!');
  });
});
