'use client'

import Image from "next/image";
import '../../../assets/profile.css'
import '../../../assets/home.css'
import { useAuthContext } from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import UpdateProfileModal from "@/components/UpdateProfileModal";
import PostContainerProfile from "@/components/PostContainerProfile";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/firebase_config";
import { useTheme } from "@/context/ThemeContext";
import ProfileSkeleton from "@/components/ProfileSkeleton";

const MyProfilePage = () => {
  const {userData} = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const {theme} = useTheme();

  useEffect(() => {
    const getMyPosts = async () => {
        if(!userData?.username) return;
        try {
            const posts = await getDocs(query(collection(db, 'posts'), orderBy('date', 'desc'), where('userName', '==', userData?.username))); //, orderBy('date', 'desc')
            const tempArr = [];
            posts.forEach(post => {
                tempArr.push({
                    postId: post.id,
                    postData: post.data()
                });
                setPosts(tempArr);
            });
        } catch(err) {
            console.log(err);
        }
    }
    getMyPosts()
  }, [userData?.username, userData?.userImgId]);

  return (
    <main className={`my-profile-page ${theme === 'light' ? 'light' : ''}`}>
        {userData !== null ? <section className='personal-info'>
            <div className='profile-top'>
                <Image draggable={false} src={userData?.userImg} width={180} height={180} alt='user'/>
                <div className='profile-user-info'>
                    <div style={{display:'flex', alignItems:'center' ,gap:'20px'}}>
                        <h1>{userData?.username}</h1>
                        <button className='edit-btn' onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faPen}/></button>
                    </div>
                    <div className='extra-info'>
                        {userData?.fullName ? <p><FontAwesomeIcon icon={faUser}/> {userData?.fullName}</p> : null}
                        {userData?.location ? <p><FontAwesomeIcon icon={faLocationDot}/> {userData?.location}</p> : null}
                    </div>
                </div>
            </div>
            <h6 className='myprofile-subtitles'>My Posts</h6>
            <section style={{display:'flex', justifyContent:'center'}}>
                <PostContainerProfile posts={posts}/>
            </section>
        </section> : <ProfileSkeleton />}
        {showModal && <UpdateProfileModal toggleModal={() => setShowModal(false)} username={userData?.username} profileImg={userData?.userImg} userLocation={userData?.location} name={userData?.fullName} profileImgId={userData?.userImgId} userId={userData?.userId}/>}
    </main>
  )
}

export default MyProfilePage
