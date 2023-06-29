'use client'

import { db } from "@/firebase_config";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import '../../../../assets/profile.css'
import '../../../../assets/home.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import PostContainerProfile from "@/components/PostContainerProfile";
import { followUser } from "@/utils/follow";
import { useTheme } from "@/context/ThemeContext";
import ProfileSkeleton from "@/components/ProfileSkeleton";
import UnFollowModal from "@/components/UnFollowModal";
import { ClipLoader } from "react-spinners";

const Profile = () => {
  const {user} = useParams();
  const [profileData, setProfileData] = useState(null);
  const {userData} = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastPost, setLastPost] = useState(null);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const {theme} = useTheme();

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

  const fetchPosts = async () => {
    setLoading(true);

    let q = query(collection(db, 'posts'), where('userName', '==', user), orderBy('date', 'desc'), limit(5));

    //Check if we have a last post and update the query to fetch from that last post
    if (lastPost) {
      const lastPostSnapshot = await getDoc(doc(collection(db, 'posts'), lastPost));
      q = query(collection(db, 'posts'), orderBy('date', 'desc'), startAfter(lastPostSnapshot), where('userName', '==', user) , limit(5));
    }

    try {
      //Fetch posts
      const snapshot = await getDocs(q);

      const newPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (newPosts.length > 0) {
        if (lastPost) {
          setPosts(prevPosts => [...prevPosts, ...newPosts]);
        } else {
          setPosts(newPosts);
        }
        setLastPost(newPosts[newPosts.length - 1].id);
      } else {
        setHasMorePosts(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const beingFollow = userData?.following?.some(user => user === profileData?.userId);

  return (
    <main className={`my-profile-page ${theme === 'light' ? 'light' : ''}`}>
      {profileData !== null ? <section className='personal-info'>
            <div className='profile-top'>
                <Image draggable={false} src={profileData?.userImg} width={180} height={180} alt='user'/>
                <div className='profile-user-info'>
                    <div className='info-container'>
                      <h1>{profileData?.username}</h1>
                      {userData?.username === profileData?.username ? null : beingFollow ? <button className='follow-btn unfollow' onClick={() => setShowModal(true)}>Unfollow</button> : <button className='follow-btn' onClick={() => followUser(profileData?.userId, profileData?.username,userData?.userId, userData?.username)}>Follow</button>}
                    </div>
                    <div className='extra-info'>
                      {profileData?.fullName ? <p><FontAwesomeIcon icon={faUser}/> {profileData?.fullName}</p> : null}
                      {profileData?.location ? <p><FontAwesomeIcon icon={faLocationDot}/> {profileData?.location}</p> : null}
                    </div>
                </div>
            </div>
            <section className='post-section'>
                <h6 className='myprofile-subtitles'>Posts</h6>
                <PostContainerProfile posts={posts}/>
                {posts.length < 1 ? null : <div style={{display:'flex', justifyContent:'center', marginBottom:'20px'}}>
                  {loading && hasMorePosts && <ClipLoader color="#e981f7" size={25}/>}
                  {!loading && hasMorePosts && <button className='load-more-btn' onClick={fetchPosts}>Load more</button>}
                  {!hasMorePosts && <p className='loading-msg'>No more Posts.</p>}
                </div>}
            </section>
        </section> : <ProfileSkeleton />}
        {showModal && <UnFollowModal  user={profileData?.username} toggleModal={() => setShowModal(false)} userId={profileData?.userId} myId={userData?.userId}/>}
    </main>
  )
}

export default Profile
