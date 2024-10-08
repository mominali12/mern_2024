import { createContext, useState } from "react";

export const UserContext = createContext()

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        email: localStorage.getItem('email'),
        posts: [],
    });

    return <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
}

export default UserProvider;