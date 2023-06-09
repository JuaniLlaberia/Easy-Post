'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase_config";

const UserDataContext = createContext();

export const UserDataProvider = ({children}) => {
    const {currentAcc} = useAuthContext();

    const [userData, setUserData] = useState({});

    useEffect(() => {
        if(currentAcc === null) return;
        const getData = async () => {
            const docSnap = await getDoc(doc(db, 'accountsData', currentAcc?.uid))
            setUserData(docSnap.data())
        }
        getData()
    }, [currentAcc?.uid])

    return (
        <UserDataContext.Provider value={{
            userData
        }}>
            {children}
        </UserDataContext.Provider>
    )
};

export const useUserDataContext = () => useContext(UserDataContext);
