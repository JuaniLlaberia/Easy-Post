'use client'

import { db } from "@/firebase_config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import '../../../../assets/profile.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import PostContainer from "@/components/PostContainer";
import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import UpdateProfileModal from "@/components/UpdateProfileModal";
import PostContainerProfile from "@/components/PostContainerProfile";

const Profile = () => {
  const {user} = useParams();
  const [profileData, setProfileData] = useState(null);
  const {userData} = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);

  //Getting profile data
  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await getDocs(query(collection(db, 'users'), where('username', '==', user)));
        data.forEach(user => setProfileData(user.data()));
      } catch(err) {
        console.log(err);
      }
    }
    getProfile()
  }, []);

  //Getting user posts
  useEffect(() => {
    const getMyPosts = async () => {
        if(!user) return;
        try {
          console.log(user);
            const posts = await getDocs(query(collection(db, 'posts'), where('userName', '==', user))); //, orderBy('date', 'desc')
            const tempArr = [];
            posts.forEach(post => {
                tempArr.push({
                    postId: post.id,
                    postData: post.data()
                });
                setPosts(tempArr);
                console.log(tempArr);
            });
        } catch(err) {
            console.log(err);
        }
    }
    getMyPosts()
  }, []);


  return (
    <main className='my-profile-page'>
      {profileData !== null ? <section className='personal-info'>
            <div className='profile-top'>
                <Image draggable={false} src={profileData?.userImg} width={180} height={180} alt='user'/>
                <div className='profile-user-info'>
                    <h1>{profileData?.username}</h1>
                    {profileData?.fullName ? <p><FontAwesomeIcon icon={faUser}/> {profileData?.fullName}</p> : null}
                    {profileData?.location ? <p><FontAwesomeIcon icon={faLocationDot}/> {profileData?.location}</p> : null}
                    {userData?.username === profileData?.username ? <button onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faPen}/></button> : null}
                </div>
            </div>
            <h6 className='myprofile-subtitles'>My Posts</h6>
            <section style={{display:'flex', justifyContent:'center'}}>
                <PostContainerProfile posts={posts}/>
            </section>
        </section> : <div>loading...</div>}
        {showModal && <UpdateProfileModal toggleModal={() => setShowModal(false)} username={userData?.username} profileImg={userData?.userImg} userLocation={userData?.location} name={userData?.fullName} profileImgId={userData?.userImgId} userId={userData?.userId}/>}
    </main>
  )
}

export default Profile
