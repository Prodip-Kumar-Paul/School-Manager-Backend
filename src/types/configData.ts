export default interface ConfigData {
  NODE_ENV?: string;
  HOST?: string;
  PORT?: string;
  DATABASE_URL: string;
  JWT_SECRET_KEY: string;
  PASSWORD: string;
  EMAIL: string;
}
