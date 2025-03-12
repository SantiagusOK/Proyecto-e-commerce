import { useMutation, useQuery } from "@tanstack/react-query"
import { UserData } from "../type/userData"
import { createUser, createUserLogin, fetchUser, fetchUsers, updateRoleuser } from "../api/userApi"

export const useUsers = () =>{
    return useQuery<UserData[], Error>({
        queryKey:["user"],
        queryFn:fetchUsers,
    })
}

export const useUser = (id:number) => {
    return useQuery<UserData, Error>({
        queryKey: ["user", id],
        queryFn: () => fetchUser(id),

    })
}

export const useRegisterUser = () => {
    return useMutation({
      mutationFn: createUser,
    })
  }
  
  export const useLoginUser = () => {
    return useMutation({
      mutationFn: createUserLogin
    })
  }

export const useRoleUser = () => {
  return useMutation({
    mutationFn: (data:{id_user:number, id_role:number}) => updateRoleuser(data.id_user, data.id_role)
  })
}
