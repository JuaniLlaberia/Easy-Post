'use client'

import { db } from "@/firebase_config"
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react";
import PostItemFeed from "./PostItemFeed";

const PostContainer = () => {
    const [posts, setPosts] = useState([]);

    const collectionRef = collection(db, 'posts');
    const firstQuery = query(collectionRef, orderBy('date', 'desc'), limit(10));

    useEffect(() => {
        const suscribe = onSnapshot(firstQuery, snapshot => {
            const data = [];
            snapshot.forEach(item => {
                data.push({
                    data: item.data(),
                    id: item.id
                });
            })
            setPosts(data);
            // console.log(data);
        })

        return suscribe
    }, []);

    const renderPosts = posts?.map(post => {
        return <PostItemFeed key={post.id} id={post.id} by={post.data.createdBy} img={post.data.imgPath} likeNum={post.data.likesNum} userName={post.data.userName} userImg={post.data.userPhotoURl} body={post.data.postBody} />
    });

  return (
    <ul>
      {renderPosts}
      <button>More posts</button>
    </ul>
  )
}

export default PostContainer
