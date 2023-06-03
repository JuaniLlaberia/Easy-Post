'use client'

import { auth } from "@/firebase_config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentAcc, setCurrentAcc] = useState(null);

    //Login to user/company account
    const loginAccount = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    //Create user/company account
    const createAccount = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    //Logout from account
    const logout = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, user => {
            setCurrentAcc(user);
        });
        return () => unsuscribe;
    }, []);

    return(
        <AuthContext.Provider value={{
            currentAcc,
            loginAccount,
            createAccount,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuthContext = () => useContext(AuthContext);