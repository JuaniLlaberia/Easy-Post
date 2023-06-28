'use client'

import { db } from "@/firebase_config";
import { doc, getDoc, onSnapshot} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useParams} from "next/navigation"
import { useEffect, useState } from "react";
import '../../../../assets/post.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart, faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fullHeart} from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "@/context/AuthContext";
import CreateComment from "@/components/CreateComment";
import CommentsContainer from "@/components/CommentsContainer";
import EditPost from "@/components/EditPost";
import DeletePost from "@/components/DeletePost";
import { formatDate } from "@/utils/formatDate";
import { addLike } from "@/utils/addLike";
import { unLike } from "@/utils/unLike";
import { useTheme } from "@/context/ThemeContext";

const PostPage = () => {
  const {currentAcc, userData} = useAuthContext();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const docRef = doc(db, 'posts', id)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const {theme} = useTheme();
  const [userImg, setUserImg] = useState('');   


  useEffect(() => {
    const unsuscribe = onSnapshot(docRef, snapshot => {
      setPost(snapshot.data());
    })
    return unsuscribe
  }, [id]);

  const isLikedByUser = post?.likedBy?.some(user => user === userData?.username)

  useEffect(() => {
    const test = async () => {
      if(!post) return;
      const data = await getDoc(post.imgRef);
      setUserImg(data.data().userImg);
  };
    test()
  }, [post]);

  return (
    <main className={`post-page ${theme === 'light' ? 'light' : ''}`}>
      <div className='post-page-contaiener'>
        <div className='post-top-section'>
            <Link href={`/home/profile/${post?.userName}`} style={{display:'flex', alignItems:'center', gap:'10px'}}>
              {userImg ? <Image draggable={false} src={userImg} width={50} height={50} alt="user"/> : null}
              {post?.userName}
              {post?.updated && <span className='edited'>(edited)</span>}
            </Link>
          <p>{formatDate(post?.date?.seconds)}</p>
        </div>
        <p className='post-body'>{post?.postBody}</p>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', borderBottom:'1px solid rgba(255, 255, 255, 0.105)'}}>
          {post?.imgPath ? <Image draggable={false} className="post-img" src={post?.imgPath} width={400} alt="preview" height={300}/> : null}
        </div>
        {/* MORE MODULAR AND MORE COMPONENTS */}
        <div className='profile-post-btns'>
          {currentAcc?.uid === post?.createdBy && <div style={{color:'white'}}>{post?.likesNum}</div>}
          {isLikedByUser ? <button onClick={() => unLike(id, userData?.username)} className="post-btn"><FontAwesomeIcon size="2x" icon={fullHeart}/></button> : <button onClick={() => addLike(id, userData?.username, post?.userName)} className="post-btn"><FontAwesomeIcon size="2x" icon={faHeart}/></button>}
          <button className="post-btn"><FontAwesomeIcon size="2x" icon={faBookmark}/></button>
          {currentAcc?.uid === post?.createdBy ? <>
              <button className="post-btn" onClick={() => setModalOpen(true)}><FontAwesomeIcon size="2x" icon={faPenToSquare}/></button>
              <button className="post-btn" onClick={() => setModalOpenDelete(true)}><FontAwesomeIcon size="2x" icon={faTrashCan}/></button>
            </> : null}
        </div>
        <CreateComment postId={id}/>
      </div>
      <CommentsContainer commentList={post?.comments} postId={id} crrUser={userData?.username}/>
      {modalOpen && <EditPost toggleModal={() => setModalOpen(false)} body={post?.postBody} docID={id}/>}
      {modalOpenDelete && <DeletePost toggleModal={() => setModalOpenDelete(false)} docID={id} photoPath={post?.imgPath}/>}
    </main>
  )
}

export default PostPage