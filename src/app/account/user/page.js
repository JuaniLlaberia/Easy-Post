'use client'

import { useAuthContext } from '@/context/AuthContext'
import '../../../assets/account.css'
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase_config';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

const UserSignUpPage = () => {
  const {createAccount, currentAcc} = useAuthContext();
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const handleNewUser = async e => {
    e.preventDefault();

    //We check that the data is OK
    if(password !== confPassword) {
      console.log('Password dont match');
      return;
    };
    //maybe apply some regex later
    //Create account
    try {
      await createAccount(email, password);
    } catch(err) {
      console.log(err);
    }
    //Save user data in firestore
    try {
      await addDoc(collection(db, 'user'), {
        name: fullName,
        email: email,
        position: '',
        location: '',
        profileImg: '',
        phone: '',
        cvPDF: '',
        userId: currentAcc?.uid,
        type: 'user',
        inbox: [],
        following: [],
        savedPosts: [],
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
            <p className='form-subtitle'>Let's create a new user account</p>
          </div>
          <div className='input-field'>
            <input className='input-form' value={fullName} required id='full-name' type='text' onChange={e => setFullName(e.target.value)}/>
            <label className='floating-label' htmlFor="full-name">Full Name</label>
          </div>
          <div className='input-field'>
            <input className='input-form' value={email} required id='email' type='email' onChange={e => setEmail(e.target.value)}/>
            <label className='floating-label' htmlFor='email'>Email Address</label>
          </div>
          <div className='combine-inputs'>
            <div className='input-field'>
              <input className='input-form' value={password} required id="password" type="password" onChange={e => setPassword(e.target.value)}/>
              <label className='floating-label' htmlFor="password">Password</label>
            </div>
            <div className='input-field'>
              <input className='input-form' value={confPassword} required id="con-password" type="password" onChange={e => setConfPassword(e.target.value)}/>
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

export default UserSignUpPage
