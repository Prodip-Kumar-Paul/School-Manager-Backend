export default interface CustomError {
  name?: string;
  message?: string;
  status?: boolean;
  statusCode: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  stack?: string;
}
