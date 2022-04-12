export default interface ConfigData {
  NODE_ENV?: string;
  HOST?: string;
  PORT?: string;
  DB_TYPE?: string;
  readonly DB_NAME: string;
  readonly DB_USER: string;
  readonly DB_PORT: string;
  readonly DB_HOST: string;
  readonly DB_URL: string;
  readonly DB_PASSWORD: string;
}
