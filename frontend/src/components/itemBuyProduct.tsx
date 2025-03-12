export const ItemBuyProduct = ({product, user}:any) => {
    return(
        <div className="w-120 p-4 bg-white flex flex-col items-center justify-center rounded-2xl">

            <div className="flex items-center justify-center space-x-10">
                <div className="bg-neutral-400 w-30 h-30 rounded-full flex items-center justify-center text-3xl text-white">
                    {product.name[0]}
                </div>
                <span className="text-4xl font-medium">{product.name}</span>  
            </div>

            <div className="flex flex-col justify-between  w-full p-4">
                

                <div className="w-full flex items-center justify-between">
                    <span>Por</span>
                    <span>{user.fullname} {user.lastname}</span>
                </div>

                <div className="w-full flex items-center justify-between">
                    <span>Direccion</span>
                    <span>{user.direccion}</span>
                </div>
                
                <div className="w-full flex items-center justify-between">
                    <span>Cantidad</span>
                    <span>x{product.amount}</span>
                </div>

                <div className="w-full flex items-center justify-between">
                    <span>Total</span>
                    <span>${product.total}</span>
                </div> 
            </div>
        
            
        </div>
    )
}