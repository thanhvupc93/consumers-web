export const isTokenExpired = (exp: number) => {
    if (exp) {
       return Date.now() > exp * 1000;  
    } return true;
   
};