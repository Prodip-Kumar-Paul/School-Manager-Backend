export default interface ConfigData {
  NODE_ENV?: string;
  HOST?: string;
  PORT?: string;
  readonly DB_NAME?: string;
  readonly DB_URL?: string;
  readonly DB_PASSWORD?: string;
}
