import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    id:0,
    fullname:"",
    lastname:"",
    username:"",
    direccion:"",
    isAdmin:false,
    password:"",
    email:"",
    birthdate:"",
    carrito_items:[],
    compras_lista:[]
}


export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        loginUser:(state,action)=>{
            const{id,fullname,lastname,username,direccion,isAdmin,password,email,birthdate,carrito_items,compras_listas} = action.payload;
            state.id=id,
            state.fullname=fullname,
            state.lastname=lastname,
            state.username=username,
            state.direccion=direccion,
            state.isAdmin=isAdmin,
            state.password=password,
            state.email=email,
            state.birthdate=birthdate,
            state.carrito_items=carrito_items,
            state.compras_lista=compras_listas
        }
    }
})


export const { loginUser } = userSlice.actions;
export default userSlice.reducer
