'use client'

import Image from "next/image";
import '../../../assets/home.css'
import { useAuthContext } from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import UpdateProfileModal from "@/components/UpdateProfileModal";

const MyProfilePage = () => {
  const {userData} = useAuthContext();
  const [showModal, setShowModal] = useState(false);

  return (
    <main className='my-profile-page'>
        {userData !== null ? <section className='personal-info'>
            <div className='profile-top'>
                <Image draggable={false} src={userData?.userImg} width={180} height={180} alt='user'/>
                <div className='profile-user-info'>
                    <h1>{userData?.username}</h1>
                    {userData?.fullName ? <p><FontAwesomeIcon icon={faUser}/> {userData?.fullName}</p> : null}
                    {userData?.location ? <p><FontAwesomeIcon icon={faLocationDot}/> {userData?.location}</p> : null}
                    <button onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faPen}/></button>
                </div>
            </div>
            <h6 className='myprofile-subtitles'>My Posts</h6>
            <ul>
                POSTs CONTAINer
            </ul>
        </section> : <div>loading...</div>}
        {showModal && <UpdateProfileModal toggleModal={() => setShowModal(false)} username={userData?.username} profileImg={userData?.userImg} userLocation={userData?.location} name={userData?.fullName} profileImgId={userData?.userImgId} userId={userData?.userId}/>}
    </main>
  )
}

export default MyProfilePage
