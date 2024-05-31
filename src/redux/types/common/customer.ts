import { UserRequest } from "redux/types/Settings/user";

export interface CustomerData {
  customerId: number;
  name: string;
  user?: UserRequest;
  clientId?: number;
}
