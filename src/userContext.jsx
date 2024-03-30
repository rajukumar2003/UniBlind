import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [userId, setuserId] = useState(localStorage.getItem('userId') || null);

    useEffect(() => {
        localStorage.setItem('userId', userId);
    }, [userId]); // Save to local storage whenever userId changes

    return (
        <UserContext.Provider value={{ userId, setuserId }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext);
}
