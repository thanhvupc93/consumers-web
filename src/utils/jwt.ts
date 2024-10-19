import { TokenType } from '@/types/token';
import jwt from 'jsonwebtoken';

const getTokenExpirationTime = () => {
    const token = sessionStorage.getItem('access_token');
    if (!token || token == "undefined") return null;

    const decodedToken: TokenType = jwt.decode(token);
    return decodedToken.exp * 1000; // Convert to milliseconds
};

export const isTokenExpired = () => {
    const expirationTime = getTokenExpirationTime();
    if (expirationTime) {
       return Date.now() > expirationTime;  
    } return true;
   
};