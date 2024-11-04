export const isTokenExpired = (exp: number) => {
    if (exp) {
       return Date.now() > exp * 60000;  
    } return true;
   
};