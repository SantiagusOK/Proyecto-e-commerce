import { RoleData } from "../type/roleData";

export const fetchRoles = async () : Promise<RoleData[]> => {
    const response = await fetch("http://localhost:8000/role")
    return response.json()
}