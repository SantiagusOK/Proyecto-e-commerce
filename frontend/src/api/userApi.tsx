import axios from "axios"
import { UserData } from "../type/userData"
import { userLoginData } from "../type/userLoginData"

export const fetchUsers = async() : Promise<UserData[]> => {
    const {data} = await axios.get("http://localhost:8000/user/")
    return data
}

export const fetchUser = async (id:number) : Promise<UserData> => {
    const {data} = await axios.get("http://localhost:8000/user/" + id)
    return data
}

export const createUser = async (userData:any) => {
    const { data } = await axios.post("http://localhost:8000/user/registerUser", userData,{
        headers: {"Content-Type": "application/json"}})
    return data
}

export const createUserLogin = async (userData:userLoginData) => {
    const { data } = await axios.post("http://localhost:8000/user/loginUser", userData,{
        headers:{"Content-Type":"application/json"}
    })
    return data
}

export const updateRoleuser = async (id_user:number, id_role:number) => {
    console.log("Id_user => " + id_user)
    console.log("Id_Role => " + id_role)
    const { data } = await axios.put("http://localhost:8000/user/setRole/" + id_user + "/" + id_role, null ,{
        headers:{"Content-Type" : "application/json"}
    })
    return data
}