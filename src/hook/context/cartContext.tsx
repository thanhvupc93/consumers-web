
'use client'
import { CartItemType } from "@/types/cartItem";
import { createContext, useContext, useEffect, useReducer } from "react";

interface CartState {
    items: CartItemType[];
}

interface CartAction {
    type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'CLEAR_CART';
    payload?: CartItemType;
}

const initialState: CartState = {
    items: [],
};

const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
}>({ state: initialState, dispatch: () => null });

const cartReducer = (state: CartState, action: CartAction): CartState => {

    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.items.find(item => item.inventories[0].id === action.payload?.inventories[0].id);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.inventories[0].id === action.payload?.inventories[0].id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }
            return { ...state, items: [...state.items, action.payload] };
        }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id),
            };
        case 'CLEAR_CART':
            return { items: [] };
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const initialState = { items: [] };

    const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
        const storedCart = localStorage.getItem('cart') || "";
        return storedCart ? JSON.parse(storedCart) : initial;
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);

    return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
};

export const useCart = () => {
    return useContext(CartContext);
};
