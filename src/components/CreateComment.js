'use client'

import { useAuthContext } from "@/context/AuthContext";
import { db } from "@/firebase_config";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { v4 as uuid } from "uuid";

const CreateComment = ({postId}) => {
    const {userData} = useAuthContext();
    const [commentBody, setCommentBody] = useState('');
    const [loadingBtn, setLoadingBtn] = useState(false);

    const handleNewComment = async () => {
        if(commentBody.length < 1) return;
        setLoadingBtn(true);
        try {
          await updateDoc(doc(db, 'posts', postId), {
            'comments': arrayUnion({
              commentBody: commentBody,
              userName: userData.username,
              userImg: userData.userImg,
              userId: userData.userId,
              commentId: uuid(),
            })
          })
        } catch(err) {
            console.log(err);
            setLoadingBtn(false);
        }
        setCommentBody('');
        setLoadingBtn(false);
      };

  return (
    <div className='new-comment'>
      {userData?.userImg ? <Image draggable={false} src={userData.userImg} alt="user" width={50} height={50}/> : null}
      <textarea value={commentBody} placeholder="Write a comment (max 150 char.)" maxLength={150} onChange={e => setCommentBody(e.target.value)}/>
      <button disabled={loadingBtn} onClick={handleNewComment}>{loadingBtn ? <ClipLoader color='#e981f7' size='10px'/> : 'Comment'}</button>
    </div>
  )
}

export default CreateComment
