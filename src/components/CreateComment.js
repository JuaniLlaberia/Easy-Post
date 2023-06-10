'use client'

import { useUserDataContext } from "@/context/UserDataContext";
import { db } from "@/firebase_config";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { v4 as uuid } from "uuid";

const CreateComment = ({postId}) => {
    const { userData } = useUserDataContext();
    const [commentBody, setCommentBody] = useState('');
    const [loadingBtn, setLoadingBtn] = useState(false);

    const handleNewComment = async () => {
        if(commentBody.length < 1) return;
        setLoadingBtn(true);
        try {
          await updateDoc(doc(db, 'posts', postId), {
            'comments': arrayUnion({
              commentBody: commentBody,
              userName: userData.name,
              userImg: userData.profileImg,
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
      <Image src={userData.profileImg} alt="user" width={50} height={50}/>
      <textarea value={commentBody} placeholder="Write a comment (max 150 char.)" maxLength={150} onChange={e => setCommentBody(e.target.value)}/>
      <button disabled={loadingBtn} onClick={handleNewComment}>{loadingBtn ? <ClipLoader color='#e981f7' size='10px'/> : 'Comment'}</button>
    </div>
  )
}

export default CreateComment
