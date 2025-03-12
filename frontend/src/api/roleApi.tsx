import axios from "axios";
import { RoleData } from "../type/roleData";

export const fetchRoles = async () : Promise<RoleData[]> => {
    const { data } = await axios.get("http://localhost:8000/role")
    return data
}