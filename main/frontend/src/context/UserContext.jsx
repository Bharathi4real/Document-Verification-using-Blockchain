import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const UserContext = createContext();

// Custom hook to use the context
export const useUserContext = () => {
    return useContext(UserContext);
};

// Context Provider component
export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([
        {
            role: 'student',
            userData: null,
            isLoggedIn: false,
        },
        {
            role: 'university',
            userData: null,
            isLoggedIn: false,
        },
        {
            role: 'company',
            userData: null,
            isLoggedIn: false,
        },
        {
            role: 'owner',
            userData: {
                email:'owner@doqfy.com',
                password:'123456',
                address:'0xccbfcc2ea11f018328072a447bd9e66711283b73',
                
            },
            isLoggedIn: true,
        }
    ]);





    // Login function
    const login = (role, userData) => {
        setUsers(prevUsers =>
            prevUsers.map(user => {
                if (user.role === role) {
                    return {
                        ...user,
                        isLoggedIn: true,
                        userData,
                    };
                }
                return user;
            })
        );
    };

    // Logout function
    const logout = (role) => {
        setUsers(prevUsers =>
            prevUsers.map(user => {
                if (user.role === role) {
                    return {
                        ...user,
                        isLoggedIn: false,
                        userData: null,
                    };
                }
                return user;
            })
        );
    };

    return (
        <UserContext.Provider
            value={{
                users,
                login,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
