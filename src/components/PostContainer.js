'use client'

import { db } from "@/firebase_config"
import { collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore"
import { useEffect, useState } from "react";
import PostItemFeed from "./PostItemFeed";
import { ClipLoader } from "react-spinners";
import { useTheme } from "@/context/ThemeContext";

const PostContainer = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastPost, setLastPost] = useState(null);
    const [hasMorePosts, setHasMorePosts] = useState(true);
    const {theme} = useTheme();

    const fetchPosts = async () => {
      setLoading(true);

      const collectionRef = collection(db, 'posts');
      let q = query(collectionRef, orderBy('date', 'desc'), limit(10));

      //Check if we have a last post and update the query to fetch from that last post
      if (lastPost) {
        const lastPostSnapshot = await getDoc(doc(collectionRef, lastPost));
        q = query(collectionRef, orderBy('date', 'desc'), startAfter(lastPostSnapshot), limit(5));
      }

      try {
        //Fetch posts
        const snapshot = await getDocs(q);

        const newPosts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        //We check if we have new posts or not, in order to know if we need to keep fetching
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

    //We call the fetchPosts function a first time in order to have the first batch of post when the page loads
    useEffect(() => {
      fetchPosts();
    }, []);


  return (
    <ul className={`post-container ${theme === 'light' ? 'light' : ''}`}>
      {posts?.map(post => (
        <PostItemFeed key={post.id} date={post?.date?.seconds} id={post.id} img={post?.imgPath} userRef={post?.imgRef} likeNum={post?.data?.likesNum} userName={post?.userName} userImg={post?.userPhotoURl} body={post?.postBody} />
      ))}
      <div style={{display:'flex', justifyContent:'center', marginBottom:'20px'}}>
        {loading && hasMorePosts && <ClipLoader color="#e981f7" size={25}/>}
        {!loading && hasMorePosts && <button className='load-more-btn' onClick={fetchPosts}>Load more</button>}
        {!hasMorePosts && <p className='loading-msg'>You're up to date. No more Posts.</p>}
      </div>
    </ul>
  )
}

export default PostContainer
