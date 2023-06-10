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
                    <h1>{userData?.name} <span className='profile-state'>{userData?.state}</span></h1>
                    <h6 className='about-me-subtitles'>About Me</h6>
                    <h6 className='about-me-text'>{userData?.description}</h6>
                </div>
            </div>
            <h6 className='myprofile-subtitles'>My Posts</h6>
            <button>Settings/edit profile</button>
            <ul>
                POSTs CONTAINer
            </ul>
        </section>
    </main>
  )
}

export default MyProfilePage
