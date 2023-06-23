import { db } from "@/firebase_config";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image"

const CommentItem = ({commentBody, userImg, userName, postId, commentId, crrUser}) => {

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
        <div>
            <Image src={userImg} draggable={false} width={50} height={50} alt="user"/>
            <h6>@{userName}</h6>
            {userName === crrUser ? <button onClick={handleCommentRemoval}><FontAwesomeIcon icon={faTrashCan}/></button> : null}
        </div>
        <p>{commentBody}</p>
    </li>
  )
}

export default CommentItem
