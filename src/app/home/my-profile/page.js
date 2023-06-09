'use client'

import Image from "next/image";
import '../../../assets/home.css'
import { useUserDataContext } from "@/context/UserDataContext";

const MyProfilePage = () => {
    const {userData} = useUserDataContext();

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
