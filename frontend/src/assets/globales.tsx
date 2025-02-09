import { useSelector } from "react-redux";

export const nameUSer = useSelector((state)=>state.user.fullname)