'use client'

import { db, storage } from "@/firebase_config"
import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import { useRouter } from "next/navigation"

const DeletePost = ({toggleModal, docID, photoPath}) => {
    const router = useRouter();

    const handleRemovePost = async () => {
        try {
          if(photoPath) await deleteObject(ref(storage, photoPath));
            await deleteDoc(doc(db, 'posts', docID));
            router.push('/home');
        } catch(err) {
            console.log(err);
        };
        toggleModal();
    };

  return (
    <>
    <div className='delete-modal'>
      <h6>You are about to remove the post</h6>
      <div style={{display:'flex', justifyContent:'center', gap:'10px'}}>
        <button onClick={toggleModal}>Cancel</button>
        <button onClick={handleRemovePost} className="remove">Remove</button>
      </div>
    </div>
    <div onClick={toggleModal} className="overlay"></div>
    </>
  )
}

export default DeletePost
