import axios from "axios"
import { UserData } from "../type/userData"
import { userSchema } from "../type/userSchema"
import { userLoginData } from "../type/userLoginData"

export const fetchUsers = async() : Promise<UserData[]> => {
    const response = await fetch("http://localhost:8000/user/")
    return response.json()
}

export const fetchAUser = async (id:number) : Promise<UserData> => {
    const response = await fetch("http://localhost:8000/user/" + id)
    return response.json()
}

export const registerUser = async (userData:any) => {
    const { data } = await axios.post("http://localhost:8000/user/registerUser", userData,{
        headers: {"Content-Type": "application/json"}})
    return data
}

export const loginUser = async (userData:userLoginData) => {
    const { data } = await axios.post("http://localhost:8000/user/loginUser", userData,{
        headers:{"Content-Type":"application/json"}
    })
    return data
}