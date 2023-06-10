'use client'

import { db } from "@/firebase_config";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react"

const EditPost = ({toggleModal, body, docID}) => {
    const [text, setText] = useState(body);

    const handleUpdate = async () => {
        try {
            await updateDoc(doc(db, 'posts', docID), {
                'postBody':text,
                'updated':true,
            })
        } catch(err) {
            console.log(err);
        }
        toggleModal();
    };

  return (
    <>
    <div className='modal-edit-post'>
        <h6>Edit post</h6>
        <textarea placeholder="Write your post text here" value={text} onChange={e => setText(e.target.value)}/>
        <button onClick={handleUpdate}>Save</button>
    </div>
    <div className="overlay" onClick={toggleModal}></div>
    </>
  )
}

export default EditPost
