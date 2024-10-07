// // app/context.js
// import React, { createContext, useState } from 'react';

// export const MyContext = createContext();

// export const MyProvider = ({ children }) => {
//     const [state, setState] = useState('Hello, World!');

//     return (
//         <MyContext.Provider value={{ state, setState }}>
//             {children}
//         </MyContext.Provider>
//     );
// };