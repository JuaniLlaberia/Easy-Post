'use client'

import { auth, db } from "@/firebase_config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { doc, onSnapshot} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentAcc, setCurrentAcc] = useState(null);
    const [userData, setUserData] = useState(null);
    const router = useRouter();

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
            onSnapshot(docRef, doc => {
                setUserData(doc.data());
            })
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, user => {
            if(user) {
                setCurrentAcc(user);
                fetchUserData(user.uid)
                router.push('/home')
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