
'use client'
import { CartItemType } from "@/types/cartItem";
import { createContext, useContext, useEffect, useReducer } from "react";

interface CartState {
    items: CartItemType[];
}

interface CartAction {
    type: 'ADD_ONE_ITEM' | 'SUB_ONE_ITEM' | 'CHANGE_QUANTITY_ITEM' | 'REMOVE_ITEM' | 'CLEAR_CART';
    payload: {
        data: CartItemType
        index: number
    };
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
        case 'ADD_ONE_ITEM': {
            if (action.payload.index >= 0) {
                return {
                    ...state,
                    items: state.items.map(item => {
                        if (item.inventories.id === action.payload.data.inventories.id) {
                            return { ...item, quantity: item.quantity + 1 }
                        } else {
                            return item
                        }
                    }
                    ),
                };
            }
            return { ...state, items: [...state.items, action.payload.data] };
        }
        case 'SUB_ONE_ITEM': {
            if (action.payload.index >= 0) {
                return {
                    ...state,
                    items: state.items.map(item => {
                        if (item.inventories.id === action.payload.data?.inventories.id) {
                            return { ...item, quantity: item.quantity - 1 }
                        } else {
                            return item
                        }
                    }
                    ),
                };
            }
            return { ...state, items: [...state.items, action.payload.data] };
        }
        case 'CHANGE_QUANTITY_ITEM': {
            if (action.payload.index >= 0) {
                return {
                    ...state,
                    items: state.items.map(item => {
                        if (item.inventories.id === action.payload.data?.inventories.id) {
                            return { ...item, quantity: action.payload.data.quantity }
                        } else {
                            return item
                        }
                    }
                    ),
                };
            }
            return { ...state, items: [...state.items, action.payload.data] };
        }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.inventories.id !== action.payload.data?.inventories.id),
            };
        case 'CLEAR_CART':
            return { items: [] };
        default:
            return state;
    }
};

type Props = {
    children: React.ReactNode; // This allows any valid React node
};

export const CartProvider = ({ children }: Props) => {
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
