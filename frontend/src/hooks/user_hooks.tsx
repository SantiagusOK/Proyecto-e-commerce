import { useMutation, useQuery } from "@tanstack/react-query"
import { UserData } from "../type/userData"
import { fetchAUser, fetchUsers } from "../api/userApi"

export const useUsersListBasic = () =>{
    return useQuery<UserData[], Error>({
        queryKey:["user"],
        queryFn:fetchUsers,
    })
}

export const useAnUser = (id:number) => {
    return useQuery<UserData, Error>({
        queryKey: ["user", id],
        queryFn: () => fetchAUser(id),

    })
}


