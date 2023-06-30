'use client'

import { useEffect, useState } from "react"
import { db, storage } from '../firebase_config';
import { collection, addDoc, serverTimestamp, doc } from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { faImage, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from 'react-spinners';
import '../assets/new-post.css';
import { useTheme } from "@/context/ThemeContext";

const CreatePost = () => {
  const {currentAcc, userData} = useAuthContext();
    const [postText, setPostText] = useState('');
    const [img, setImg] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [error, setError] = useState('');
    const {theme} = useTheme();
    const collectionPostsRef = collection(db, 'posts');

    const handleCreatePost = async e => {
        e.preventDefault();
        setLoadingBtn(true);

        //Taking care of the IMG
        let filePath = '';
        let imageId = '';

        if(img) {
            imageId = uuidv4();
            const storageRef = ref(storage, `${imageId}.${img?.type?.split('/')[1]}`);
            try {
                await uploadBytes(storageRef, img);
                filePath = await getDownloadURL(storageRef);
            } catch(err) {
                setError('Problem with img')
                setLoadingBtn(false);
            }
        };

        //Creating the Post
        try {
            await addDoc(collectionPostsRef, {
                createdBy: currentAcc?.uid,
                userName: userData?.username,
                postBody: postText,
                updated: false,
                comments: [],
                likedBy: [],
                likesNum: 0,
                date: serverTimestamp(),
                imgPath: filePath,
                imgId: imageId,
                imgRef: doc(db, 'users/' + currentAcc?.uid)
            })
        } catch(err) {
            console.log(err);
            setError('Failed to upload')
            setLoadingBtn(false);
        }
        setImg(null);
        setImgPreview(null);
        setPostText('');
        setLoadingBtn(false);
    };

    useEffect(() => {
      setTimeout(() => {
        setError('');
      }, 3500);
    }, [error]);

  return (
    <>
        <div className={`create-post-container ${theme === 'light' ? 'light' : ''}`}>
            <h3>Create new post</h3>
            <form onSubmit={handleCreatePost}>
                <textarea value={postText} placeholder='Write your post here' onChange={e => setPostText(e.target.value)} maxLength={300} minLength={1}/>
                <p>{postText.length}/300</p>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  {imgPreview ? <Image src={imgPreview} className="img-preview" width={100} alt="preview" height={100}/> : null}
                </div>
                <button disabled={postText.length < 1} className="post">{loadingBtn ? <ClipLoader color="#e981f7" size={20}/> : 'Post'}</button>
                <div style={{position:'absolute', bottom:'5%', display:'flex', gap:'7.5px'}}>
                  <label htmlFor='upload-photo' className='img-input'>
                      <FontAwesomeIcon icon={faImage} style={{color: img ? '#73de3a' : ''}}/>
                      <input style={{display:'none'}} accept="image/png, image/gif, image/jpeg" id='upload-photo' type="file" onChange={e => {
                        setImgPreview(URL.createObjectURL(e.target.files[0]))
                        setImg(e.target.files[0])}}/>
                  </label>
                  <button className="remove-img-btn" onClick={e => {
                    e.preventDefault()
                    setImg(null);
                    setImgPreview(null);
                  }}><FontAwesomeIcon icon={faTrash}/></button>
                </div>
            </form>
        </div>
        {error ? <p className='error-msg-home'><FontAwesomeIcon color='red' icon={faXmarkCircle}/>{error}</p> : null}
    </>
  )
}

export default CreatePost
