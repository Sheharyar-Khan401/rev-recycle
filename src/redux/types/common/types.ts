export interface PayloadType<T> {
  errorCode: number;
  jwt: string;
  message: string;
  numberOfItems: number;
  payLoad: T;
  status: string;
}
