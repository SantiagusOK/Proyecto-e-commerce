import { useMutation } from '@tanstack/react-query'
import { loginUser, registerUser } from './userApi'

export const userRegisterMutation = () => {
  return useMutation({
    mutationFn: registerUser,
    onError:(error:any) => {
        if(error.response && error.response.data.detail){
            console.log("error: " + error.response.data.detail)
            throw new Error(error.response.data.detail);
        }
    }
  })
}

export const userLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser
  })
}
