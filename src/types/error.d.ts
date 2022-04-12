export default interface MyError {
  name?: string;
  message?: string;
  status?: boolean;
  statusCode: number;
  data?: string;
  stack?: string;
}
