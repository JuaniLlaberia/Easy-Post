'use client'

import { db } from "@/firebase_config"
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react";
import PostItemFeed from "./PostItemFeed";
import '../assets/home.css'
import { useTheme } from "@/context/ThemeContext";


const TrendingContainer = () => {
    const [posts, setPosts] = useState([]);
    const {theme} = useTheme();

    const collectionRef = collection(db, 'posts');
    const trendingQuery = query(collectionRef, orderBy('likesNum', 'desc'), orderBy('date', 'desc'), limit(10));

    useEffect(() => {
        const suscribe = onSnapshot(trendingQuery, snapshot => {
            const data = [];
            snapshot.forEach(item => {
                data.push({
                    data: item.data(),
                    id: item.id
                });
            })
            setPosts(data)
        });

        return suscribe
    }, []);

    const renderPosts = posts?.map(post => {
        return <PostItemFeed key={post.id} date={post.data.date.seconds} id={post.id} userRef={post.data.imgRef} img={post.data.imgPath} likeNum={post.data.likesNum} userName={post.data.userName} userImg={post.data.userPhotoURl} body={post.data.postBody} />
    });

  return (
    <ul className={`post-container ${theme === 'light' ? 'light' : ''}`}>
      {renderPosts}
    </ul>
  )
}

export default TrendingContainer
