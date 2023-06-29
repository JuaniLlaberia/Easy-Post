'use client'

import { useState } from "react";
import CustomInput from "./CustomInput";
import Image from "next/image";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/firebase_config";
import { v4 as uuidv4 } from 'uuid';
import { doc, updateDoc } from "firebase/firestore";
import '../assets/account.css'
import '../assets/profile.css'
import { ClipLoader } from "react-spinners";
import { useAuthContext } from "@/context/AuthContext";

const UpdateProfileModal = ({toggleModal, username, profileImg, profileImgId, name, userLocation, userId}) => {
    const [newProfileImg, setNewProfileImg] = useState(profileImg);
    const [previewImg, setPreviewImg] = useState(profileImg);
    const [fullName, setFullName] = useState(name);
    const [location, setLocation] = useState(userLocation);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const {userData} = useAuthContext();

    const handleUpdateProfile = async e => {
        e.preventDefault();
        setLoadingBtn(true);

        let newImgPath = profileImg;
        let newImgId = '';

        //Check if current img is === or !== to new img
        try {
            if(profileImg !== newProfileImg && profileImgId !== '') {
                //Remove old image from storage
                await deleteObject(ref(storage, profileImg));
                console.log('Old image deleted');
            };

            //Upload new image
            if(profileImg !== newProfileImg) {
                newImgId = uuidv4();
                const imgRef = ref(storage, `images/${userData?.userId}/userImage.${newProfileImg?.type?.split('/')[1]}`);
                await uploadBytes(imgRef, newProfileImg);
                newImgPath = await getDownloadURL(imgRef);
                console.log(newImgPath);
            };

        } catch(err) {
            console.log(err);
            setLoadingBtn(false);
        }

        //Update profile info, including imgPath and imgId
        try {
            await updateDoc(doc(db, 'users', userId), {
                'fullName': fullName,
                'location': location,
                'userImg': newImgPath,
                'userImgId': newImgId,
            });
        } catch(err) {
            console.log(err);
            setLoadingBtn(false);
        }
        toggleModal();
    };

  return (
    <>
    <form className='modal-edit-profile'>
        <section className='info-left'>
            <p>Change profile image</p>
            <input style={{display:'none'}} accept="image/jpeg" id='profile-img' type="file" onChange={e => {
                setNewProfileImg(e.target.files[0])
                setPreviewImg(URL.createObjectURL(e.target.files[0]))
                }}/>
            <label htmlFor="profile-img"><Image src={previewImg} width={250} height={250} className='profile-img' alt='profile'/></label>
        </section>
        <section className='info-right'>
            <p>User Information</p>
            <CustomInput classInput='input-form' textColor='white' bg='rgb(26, 23, 23)' classLabel='floating-label' value={username} id='username' required={false} readonly={true} type='text' label='Username'/>
            <CustomInput classInput='input-form' textColor='white' bg='rgb(26, 23, 23)' classLabel='floating-label' value={fullName} required={false} readonly={false} id='fullname' type='text' label='Full Name' onChange={e => setFullName(e.target.value)} max={50}/>
            <CustomInput classInput='input-form' textColor='white' bg='rgb(26, 23, 23)' classLabel='floating-label' value={location} id='location' required={false} readonly={false} type='text' onChange={e => setLocation(e.target.value)} label='Location' max={100}/>
        </section>
        <button onClick={handleUpdateProfile}>{loadingBtn ? <ClipLoader color="#e981f7" size='15px'/> : 'Save'}</button>
    </form>
    <div className="overlay-profile" onClick={toggleModal}></div>
    </>
  )
}

export default UpdateProfileModal
