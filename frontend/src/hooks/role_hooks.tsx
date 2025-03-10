import { useQuery } from "@tanstack/react-query"
import { RoleData } from "../type/roleData"
import { fetchRoles } from "../api/roleApi"

export const useRoles = () =>{
    return useQuery<RoleData[], Error>({
        queryKey:["roles"],
        queryFn: fetchRoles,

    })
}