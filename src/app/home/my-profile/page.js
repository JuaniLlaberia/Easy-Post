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
import { collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { db } from "@/firebase_config";
import { useTheme } from "@/context/ThemeContext";
import ProfileSkeleton from "@/components/ProfileSkeleton";
import { ClipLoader } from "react-spinners";

const MyProfilePage = () => {
  const {userData} = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastPost, setLastPost] = useState(null);
  const [hasMorePosts, setHasMorePosts] = useState(true)
  const {theme} = useTheme();

const fetchPosts = async () => {
    if(!userData?.username) return;
    setLoading(true);

    let q = query(collection(db, 'posts'), where('userName', '==', userData?.username), orderBy('date', 'desc'), limit(5));

    //Check if we have a last post and update the query to fetch from that last post
    if (lastPost) {
      const lastPostSnapshot = await getDoc(doc(collection(db, 'posts'), lastPost));
      q = query(collection(db, 'posts'), orderBy('date', 'desc'), startAfter(lastPostSnapshot), where('userName', '==', userData?.username) , limit(5));
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
  }, [userData?.username]);

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
            <section className='post-section'>
                <h6 className='myprofile-subtitles'>My Posts</h6>
                <PostContainerProfile posts={posts}/>
                {posts.length < 1 ? null : <div style={{display:'flex', justifyContent:'center', marginBottom:'20px'}}>
                  {loading && hasMorePosts && <ClipLoader color="#e981f7" size={25}/>}
                  {!loading && hasMorePosts && <button className='load-more-btn' onClick={fetchPosts}>Load more</button>}
                  {!hasMorePosts && <p className='loading-msg'>No more Posts.</p>}
                </div>}
            </section>
        </section> : <ProfileSkeleton />}
        {showModal && <UpdateProfileModal toggleModal={() => setShowModal(false)} username={userData?.username} profileImg={userData?.userImg} userLocation={userData?.location} name={userData?.fullName} profileImgId={userData?.userImgId} userId={userData?.userId}/>}
    </main>
  )
}

export default MyProfilePage
