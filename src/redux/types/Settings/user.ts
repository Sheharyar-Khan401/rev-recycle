import { Business } from "redux/types/common/business";
import { Department } from "redux/types/Settings/Productions/department";
import { Floors } from "redux/types/common/floor";
import { InvoiceType } from "redux/types/Settings/Purchase/invoicetype";
import { Role } from "redux/types/Settings/role";

export interface UserData {
  address: string;
  businesses?: Business[];
  email: string;
  expiryDate: number;
  fullName: string;
  image: string;
  imageUrl: string;
  listofuserdepts?: ListOfDepts[];
  listofuserFloor?: ListOfFloors[];
  listofuserInvoiceType?: ListOfInvoiceTypes[];
  listofuserrole?: Array<ListofRoles>;
  password: string;
  phoneNo: string;
  status: string;
  userId: number;
  userName: string;
  username: string;
  userStatus: string;
}

export interface ListOfDepts {
  dept?: Department;
  user_deptId: number;
}
export interface ListOfFloors {
  floor?: Floors;
  user_floorId: number;
}
export interface ListOfInvoiceTypes {
  invoiceType?: InvoiceType;
  user_invoicetypeId: number;
}
export interface ListofRoles {
  role?: Role;
  user_roleId: number;
}
export interface UserRequest {
  confirmPwd?: string;
  email: string;
  expiryDate: string;
  fullName: string;
  image?: File | null | string;
  password?: string;
  phoneNo: string;
  userStatus: string;
  userId?: number;
  userName: string;
}

