import { AddressData } from "./addressData";
import { RoleData } from "./roleData";

export interface UserData {
    id:number,
    fullname:string,
    lastname:string,
    username:string,
    role:RoleData,
    email:string,
    birthdate:string,
    address:AddressData,
}



