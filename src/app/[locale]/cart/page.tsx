"use client"
import { useCart } from "@/hook/context/CartContext";
export default function Cart() {
    const { state } = useCart();
    return <>
        heloo cart
        {state.items.toString()}

        {state.items.map((e) => (
            <li key={`${e.id}_size`} className="button_silver_hover px-[5px]">
                {JSON.stringify(e)}
            </li>
        ))}
    </>
}