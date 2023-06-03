'use client'

import { useAuthContext } from '@/context/AuthContext'
import '../../../assets/account.css'
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase_config';
import { useRouter } from 'next/navigation';

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
        type: 'user'
      });
    } catch(err) {
      console.log(err);
    }
    //Redirect to login page
    router.push('/user/home');
  };

  return (
    <main className='user-signin-page'>
      {currentAcc?.uid}
      <div className='user-new-container'>
        <form className='user-new-form' onSubmit={handleNewUser}>
          <h1>New account</h1>
          <label htmlFor="full-name">Full Name</label>
          <input value={fullName} required id='full-name' type='text' placeholder='Enter your full name' onChange={e => setFullName(e.target.value)}/>
          <label  htmlFor='email'>Email</label>
          <input value={email} required id='email' type='email' placeholder="Enter your email address" onChange={e => setEmail(e.target.value)}/>
          <label htmlFor="password">Password</label>
          <input value={password} required id="password" type="password" placeholder="Enter your password" onChange={e => setPassword(e.target.value)}/>
          <label htmlFor="con-password">Confirm Password</label>
          <input value={confPassword} required id="con-password" type="password" placeholder="Confirm your password" onChange={e => setConfPassword(e.target.value)}/>
          <button>Create account</button>
        </form>
      </div>
    </main>
  )
}

export default UserSignUpPage
