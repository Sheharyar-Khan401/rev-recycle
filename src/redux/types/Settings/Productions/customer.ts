import { UserData } from "redux/types/Settings/user";
export interface CustomerData{
    customerId:number,
    clientId?:number
    name:string,
    user?:UserData
}