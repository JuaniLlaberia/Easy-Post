'use client'

import { useAuthContext } from "@/context/AuthContext"
import { db } from "@/firebase_config";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import '../../../assets/home.css'

const MyProfilePage = () => {
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
    <main className='my-profile-page'>
        <section className='personal-info'>
            <div className='profile-top'>
                <Image draggable={false} src={userData?.profileImg} width={180} height={180} alt='user'/>
                <div>
                    <h1>{userData?.name}</h1>
                    <h6>{userData?.state}</h6>
                </div>
            </div>
            <h6 className='myprofile-subtitles'>About Me</h6>
            <p className="description">{userData?.description}</p>
            <h6 className='myprofile-subtitles'>My Posts</h6>
            <ul>
                POSTs CONTAINer
            </ul>
        </section>
    </main>
  )
}

export default MyProfilePage
