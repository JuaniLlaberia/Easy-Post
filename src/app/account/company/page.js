'use client'

import { useAuthContext } from '@/context/AuthContext'
import '../../../assets/account.css'
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '@/firebase_config';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

const CompanySignUp = () => {
  const { createAccount, currentAcc } = useAuthContext();
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [companyLogo, setCompanyLogo] = useState(null);
  const [companyPhone, setCompanyPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const handleNewUser = async e => {
    e.preventDefault();

    //We check that the data is OK
    if(password !== confPassword) {
      console.log('Password dont match');
      return;
    };

    //Create account
    try {
      await createAccount(email, password);
    } catch(err) {
      console.log(err);
    }
    //Save profile image in storage bucket
    let filePath = '';
    const imgId = uuidv4();

    const storageRef = ref(storage, `${imgId}.${companyLogo?.type?.split('/')[1]}`);
    try {
      await uploadBytes(storageRef, companyLogo);
      filePath = await getDownloadURL(storageRef);
    } catch(err){
      console.log(err);
    }
    //Save user data in firestore
    try {
      await addDoc(collection(db, 'user'), {
        name: companyName,
        email: email,
        profileImg: '',
        phone: companyPhone,
        userId: currentAcc?.uid,
        type: 'company',
        inbox: [],
        logoId: imgId,
        logoPath: filePath,
      });
    } catch(err) {
      console.log(err);
    }
    //Redirect to login page
    router.push('/home');
  };

  return (
    <main className='user-signin-page'>
        <form className='user-new-form' onSubmit={handleNewUser}>
          <div>
            <h1 className='form-title'>Sign Up</h1>
            <p className='form-subtitle'>Let's create a new company account</p>
          </div>
          <div className='input-field'>
            <input className='input-form' value={companyName} required id='company' type='text' onChange={e => setCompanyName(e.target.value)}/>
            <label className='floating-label' htmlFor="company">Company Name</label>
          </div>
          <div className='input-field'>
            <input className='input-form' value={email} required id='email' type='text' onChange={e => setEmail(e.target.value)}/>
            <label className='floating-label' htmlFor='email'>Email Address</label>
          </div>
          <div className='input-field'>
            <input className='input-form' value={companyPhone} required id='phone' type='tel' onChange={e => setCompanyPhone(e.target.value)}/>
            <label className='floating-label' htmlFor='phone'>Phone Number</label>
          </div>
          <div className='combine-inputs'>
            <div className='input-field'>
              <input className='input-form phone' value={password} required id="password" type="password" onChange={e => setPassword(e.target.value)}/>
              <label className='floating-label' htmlFor="password">Password</label>
            </div>
            <div className='input-field'>
              <input className='input-form phone' value={confPassword} required id="con-password" type="password" onChange={e => setConfPassword(e.target.value)}/>
              <label className='floating-label' htmlFor="con-password">Confirm Password</label>
            </div>
          </div>
          <div className='btns-container'>
            <button className='create-acc-button'>Create Account</button>
            <Link href='/account' className='login-already'>Already register?</Link>
          </div>
        </form>
        <Link href='/' className='go-back'><FontAwesomeIcon icon={faArrowLeftLong}/> Go back</Link>
    </main>
  )
}

export default CompanySignUp
