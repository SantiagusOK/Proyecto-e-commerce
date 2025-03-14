import Loading from "../components/loading";
import { useActiveCart } from "../hooks/cart_hooks";
import { ItemCartCad } from "../components/itemCartCard";
import { CartOptions } from "../components/cartOptions";

export const CarritoPage = () => {
    const storage = localStorage.getItem("userData");
    const user = JSON.parse(storage!);
    const id_user = Number(user.id);

    const { data: cart, isLoading, isError, error } = useActiveCart(id_user);

    if (isLoading) {
        return <Loading />;
    }

    console.log(error)

    if (!cart || !cart.cart_items) {
        return (
            <div className="flex justify-center items-center p-10">
                <span className="text-2xl text-white">
                    No hay un carrito activo :)
                </span>
            </div>
        );
    }

    return (
        <div className="flex justify-center space-x-10 p-10">
            <div className="flex flex-col space-y-2 h-150 overflow-y-auto px-2 overflow-x-hidden">
                {cart!.cart_items.map((cartItem) => (
                    <ItemCartCad key={cartItem.id} item={cartItem} />
                ))}
            </div>
            <CartOptions cart={cart!} />
        </div>
    );
};