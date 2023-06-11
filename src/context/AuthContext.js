'use client'

import { auth, db } from "@/firebase_config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentAcc, setCurrentAcc] = useState(null);
    const [userData, setUserData] = useState(null);

    //Login to user/company account
    const loginAccount = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    //Create user/company account
    const createAccount = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    //Reset password with email
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    //Logout from account
    const logout = () => {
        return signOut(auth);
    }

    //Fetch current user data
    const fetchUserData = async (uid) => {
        try {
            const docRef = doc(db, 'users', uid);
            const userData = await getDoc(docRef);

            if(userData.exists) {
                setUserData(userData.data());
            } else {
                console.log('User not found. Try Again!');
            }
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, user => {
            if(user) {
                setCurrentAcc(user);
                fetchUserData(user.uid)
            };
        });
        return () => unsuscribe;
    }, []);

    return(
        <AuthContext.Provider value={{
            currentAcc,
            setCurrentAcc,
            loginAccount,
            createAccount,
            logout,
            resetPassword,
            userData
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuthContext = () => useContext(AuthContext);