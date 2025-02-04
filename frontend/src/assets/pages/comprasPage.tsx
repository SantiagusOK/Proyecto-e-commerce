import { useState } from "react"


interface comprasData{
    id:number,
    id_user:number,
    fechaCompra:string,
    comprasList:[]
}

const MisComprasPage = () =>{

    const[comprasList, setComprasList] = useState()

    return(
        <div>
            <h1>COMPRAS</h1>
        </div>
    )
}


export default MisComprasPage