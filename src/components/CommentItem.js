'use client'

import { db } from "@/firebase_config";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image"
import Link from "next/link";
import { useState } from "react";

const CommentItem = ({commentBody, userName, postId, commentId, crrUser, imgUserRef}) => {
  const [userImg, setUserImg] = useState('');

  const getUserImg = async () => {
    const photo = await getDoc(imgUserRef)
    setUserImg(photo.data().userImg)
  };

  getUserImg()

  const handleCommentRemoval = async () => {
    const postRef = doc(db, 'posts', postId);

    try {
      const postDoc = await getDoc(postRef);

      if (postDoc.exists()) {
        const comments = postDoc.data().comments || [];

        const updatedComments = comments.filter(comment => comment.commentId !== commentId);

        await updateDoc(postRef, {
          comments: updatedComments
        });

      } else {
        console.log('Not found');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li className='comment-item'>
        <Link href={crrUser === userName ? '/home/my-profile' : `/home/profile/${userName}`}>
            {userImg ? <Image src={userImg} draggable={false} width={50} height={50} alt="user"/> : null}
            <h6>@{userName}</h6>
        </Link>
        {userName === crrUser ? <button className='delete-comment-btn' onClick={handleCommentRemoval}><FontAwesomeIcon icon={faTrashCan}/></button> : null}
        <p>{commentBody}</p>
    </li>
  )
}

export default CommentItem
