import React, { Component, createContext, useState, useEffect } from "react";
import 'firebase/auth'
import { useFirebaseApp } from 'reactfire';

export const UserContext = createContext({ user: null });

const UserProvider = ({ ...props }) => {
    const [user, setUser] = useState(null);

    const firebase = useFirebaseApp();

    const useEffect = () => {
        firebase.auth().onAuthStateChanged(userAuth => {
            setUser(userAuth);
        });
    };

    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    );

}
export default UserProvider;