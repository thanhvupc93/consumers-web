
'use client'
import { createContext, useContext, useEffect, useReducer } from "react";
import jwt from 'jsonwebtoken';
import { TokenType } from "@/types/token";
import { signOut } from 'next-auth/react';
import { RoleType } from "@/types/role";

interface UserAction {
    type: 'LOGIN' | 'LOGUOT';
    payload?: {
        token: string
    };
}
const role: RoleType = {
    id: 0,
    name: '',
    description: '',
    isActive: true
}

const initialState: TokenType = {
    userName: '',
    fullName: '',
    id: 0,
    email: '',
    phone: '',
    exp: 0,
    iat: 0,
    roles: [role]
};

const UserContext = createContext<{
    state: TokenType;
    dispatch: React.Dispatch<UserAction>;
}>({ state: initialState, dispatch: () => null });

const userReducer = (state: TokenType, action: UserAction): TokenType => {

    switch (action.type) {
        case 'LOGIN': {
            const decoded = jwt.decode(action.payload?.token || "");
            if (decoded) {
                if (typeof decoded === 'string') {
                    return initialState;
                } else {
                    const user: TokenType = {
                        userName: decoded.userName,
                        fullName: decoded.fullName,
                        id: decoded.id || 0,
                        email: decoded.email,
                        phone: decoded.phone,
                        exp: decoded.exp || 0,
                        iat: decoded.iat || 0,
                        roles: decoded.roles || [role]
                    }
                    return user;
                }
            } else {
                return initialState;
            }
        }
        case 'LOGUOT':
            signOut({
                callbackUrl: '/',
            });
            return initialState;
        default:
            return state;
    }
};

type Props = {
    children: React.ReactNode; // This allows any valid React node
};

export const UserProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(userReducer, initialState, (initial) => {  
        const storedCart = localStorage.getItem('user');
        return storedCart ? JSON.parse(storedCart) : initial;
    });

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state));
    }, [state]);

    return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>
};

export const useUser = () => {
    return useContext(UserContext);
};


