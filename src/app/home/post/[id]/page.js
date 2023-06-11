'use client'

import { db } from "@/firebase_config";
import { doc, onSnapshot} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useParams} from "next/navigation"
import { useEffect, useState } from "react";
import '../../../../assets/home.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart, faPenToSquare, faShareFromSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useAuthContext } from "@/context/AuthContext";
import CreateComment from "@/components/CreateComment";
import CommentsContainer from "@/components/CommentsContainer";
import EditPost from "@/components/EditPost";
import DeletePost from "@/components/DeletePost";

const PostPage = () => {
  const {currentAcc} = useAuthContext();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const docRef = doc(db, 'posts', id)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);

  useEffect(() => {
    const unsuscribe = onSnapshot(docRef, snapshot => {
      setPost(snapshot.data());
    })
    return unsuscribe
  }, [id]);

  return (
    <main className='post-page'>
      <div className='post-page-contaiener'>
        <div className='post-top-section'>
            <Link href={`/home/profile/${post?.createdBy}`} style={{display:'flex', alignItems:'center', gap:'10px'}}>
              {post?.userPhotoURl ? <Image draggable={false} src={post?.userPhotoURl} width={50} height={50} alt="user"/> : null}
              {post?.userName}
              {post?.updated && <span className='edited'>(edited)</span>}
            </Link>
          <p>06/12/2002</p>
        </div>
        <p className='post-body'>{post?.postBody}</p>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', borderBottom:'1px solid rgba(255, 255, 255, 0.105)'}}>
          {post?.imgPath ? <Image draggable={false} className="post-img" src={post?.imgPath} width={400} alt="preview" height={300}/> : null}
        </div>
        {/* MORE MODULAR AND MORE COMPONENTS */}
        <div className='profile-post-btns'>
          <button className="post-btn"><FontAwesomeIcon size="2x" icon={faHeart}/></button>
          <button className="post-btn"><FontAwesomeIcon size="2x" icon={faBookmark}/></button>
          <button className="post-btn"><FontAwesomeIcon size="2x" icon={faShareFromSquare}/></button>
          {currentAcc?.uid === post?.createdBy ? <>
              <button className="post-btn" onClick={() => setModalOpen(true)}><FontAwesomeIcon size="2x" icon={faPenToSquare}/></button>
              <button className="post-btn" onClick={() => setModalOpenDelete(true)}><FontAwesomeIcon size="2x" icon={faTrashCan}/></button>
            </> : null}
        </div>
        {/* <CreateComment postId={id}/> */}
      </div>
      <CommentsContainer commentList={post?.comments}/>
      {modalOpen && <EditPost toggleModal={() => setModalOpen(false)} body={post?.postBody} docID={id}/>}
      {modalOpenDelete && <DeletePost toggleModal={() => setModalOpenDelete(false)} docID={id} photoPath={post?.imgPath}/>}
    </main>
  )
}

export default PostPage