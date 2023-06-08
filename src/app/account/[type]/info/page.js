'use client'

import Image from 'next/image'
import userImg from '../../../../assets/user_placeholder.png'
import '../../../../assets/info.css'
import '../../../../assets/account.css'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { db, storage } from '@/firebase_config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';

const InfoPage = () => {
    const { type } = useParams();
    const {currentAcc} = useAuthContext();
    const router = useRouter();
    const [profileImg, setProfileImg] = useState({});
    const [previewImg, setPreviewImg] = useState(userImg);
    const [cv, setCv] = useState({});
    const [description, setDescription] = useState('');
    const [field, setField] = useState('');
    const [name, setName] = useState('');


    //FIX PROBLEM => CHECKING THAT WE UPLOAD A CV AND IMG, in case we dont -> Dont submit (maybe transforming everything into a form...?)
    const handleFinish = async () => {
      //Check that all fields are correct
      if(name === '' && field === '' && description === '') {
        console.log('Must fill all fields');
        return;
      };

      //Store image in cloud
      if(!profileImg) return;

      let filePath = '';
      const fileID = uuidv4();

      const storageRef = ref(storage, `${fileID}.${profileImg?.type?.split('/')[1]}`);

      try {
        await uploadBytes(storageRef, profileImg);
        filePath = await getDownloadURL(storageRef);
      } catch(err) {
        console.log(err);
      }

      //Store cv in cloud for users
      let cvPath = '';
      let cvID = '';

      if(type === 'user') {
        if(!cv) return;

        cvID = uuidv4();

        const storageRefPDF = ref(storage, `${cvID}.pdf`);
        try {
          await uploadBytes(storageRefPDF, cv);
          cvPath = await getDownloadURL(storageRefPDF);
        } catch(err) {
          console.log(err);
        }
      };

      //Data
      const userObject = {
        name: name,
        email: currentAcc?.email,
        position: field,
        profileImg: filePath,
        profileImgID: fileID,
        cvPDF: cvPath,
        cvPDFID: cvID,
        userId: currentAcc?.uid,
        type: 'user',
        description: description,
        inbox: [],
        following: [],
        savedPosts: [],
      };

      const companyObject = {
        name: name,
        email: currentAcc?.email,
        profileImg: filePath,
        profileImgID: fileID,
        userId: currentAcc?.uid,
        type: 'company',
        inbox: [],
        description: description,
      };

      //Store account in database
      try {
        await setDoc(doc(db, 'accountsData', currentAcc?.uid),
          type === 'user' ? userObject : companyObject
        );
      } catch(err) {
        console.log(err);
      }

      router.push('/home');
    }

  return (
    <main className="additional-info-page">
      <section className='title-section'>
        <h3>We're almost there</h3>
        <p>You just need to fill some additional information to finish your profile</p>
      </section>
      <section className="info-section">
        <div className='info-left'>
            <p>Change profile image</p>
            <input style={{display:'none'}} accept="image/png, image/jpeg" id='profile-img' type="file" onChange={e => {
                setProfileImg(e.target.files[0])
                setPreviewImg(URL.createObjectURL(e.target.files[0]))
                }}/>
            <label htmlFor="profile-img"><Image src={previewImg} width={150} height={150} className='profile-img' alt='profile'/></label>
            <input id="profile-cv" type="file" style={{display:'none'}} accept="application/pdf" onChange={e => setCv(e.target.files[0])}/>
            {type === 'user' ? <label htmlFor="profile-cv" className='cv'>Add CV</label> : null}
        </div>
        <form className='info-right'>
            <p>Additional Information</p>
            <div className='input-field'>
                <input className="input-form" value={name} id="name" required  type="text" onChange={e => setName(e.target.value)}/>
                <label className="floating-label" htmlFor="name">{type === 'user' ? 'Full' : 'Company'} name</label>
            </div>
            <div className='input-field'>
                <input className="input-form" id="email" required  type="text" value={currentAcc?.email} readOnly/>
                <label className="floating-label" htmlFor="email">Email Address</label>
            </div>
            <div className='input-field'>
                <textarea value={description} className="input-form" id="description" required  type="text" onChange={e => setDescription(e.target.value)}/>
                <label className="floating-label" htmlFor="description">Description</label>
            </div>
            <div className='input-field'>
                <input value={field} className="input-form" id="position" required  type="text" onChange={e => setField(e.target.value)}/>
                <label className="floating-label" htmlFor="position">Your Field</label>
            </div>
        </form>
      </section>
      <section className='btn-section'>
        <button onClick={handleFinish} className='create-acc-button'>Finish</button>
      </section>
    </main>
  )
}

export default InfoPage
