import config from './config/config';

process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);
  process.exit(1);
});

import app from './app';

// const DB = config.DB_URL.replace('<password>', config.DB_PASSWORD);

// DB connection

const port = process.env.PORT || config.PORT || 8080;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Server started on PORT: ${port} in ${
      process.env.NODE_ENV || 'dev'?.trim().toUpperCase()
    } mode`,
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
