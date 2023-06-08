'use client'

import { useAuthContext } from '@/context/AuthContext'
import '../../../../assets/account.css';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase_config';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

const UserSignUpPage = () => {
  const {createAccount, currentAcc} = useAuthContext();
  const router = useRouter();
  const [fullName, setFullName] = useState({name:'', isTouched:false});
  const [email, setEmail] = useState({email:'', isTouched:false});
  const [password, setPassword] = useState({password:'', isTouched:false});
  const [confPassword, setConfPassword] = useState({password:'', isTouched:false});
  const { type } = useParams();

  const userObject = {
    name: fullName.name,
    email: email.email,
    position: '',
    location: '',
    profileImg: '',
    cvPDF: '',
    userId: currentAcc?.uid,
    type: 'user',
    inbox: [],
    following: [],
    savedPosts: [],
  };

  const companyObject = {
    name: fullName.name,
    email: email.email,
    profileImg: '',
    userId: currentAcc?.uid,
    type: 'company',
    inbox: [],
    logoId: '',
    logoPath: '',
  };

  //password validation
  const validatePasswordFormat = (password) => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})(?=.*[!@#$%^&*])");
    return strongRegex.test(password);
  };

  const handleNewUser = async e => {
    e.preventDefault();

    //apply some regex later for password/email/phone
    //We check that the data is OK
    if(password.password !== confPassword.password) {
      console.log('Password dont match');
      return;
    };

    //Create account
    try {
      await createAccount(email.email, password.password);
    } catch(err) {
      console.log(err);
    };

    //Save data in firestore
    try {
      await addDoc(collection(db, 'accountsData'),
        type === 'user' ? userObject : companyObject
      );
    } catch(err) {
      console.log(err);
    }

    //Redirect to profile page to finish data filling
    router.push('/home');
  };

  return (
    <main className='user-signin-page'>
        <form className='user-new-form' onSubmit={handleNewUser}>
          <div>
            <h1 className='form-title'>Sign Up</h1>
            <p className='form-subtitle'>Let's create a new {type} account</p>
          </div>
          <div className='input-field'>
            <input className={`input-form ${fullName.isTouched && fullName.name.length < 1 ? 'invalid-input' : ''}`} value={fullName.name} required id='full-name' type='text' onChange={e => setFullName({...fullName, name:e.target.value})} onBlur={() => setFullName({...fullName, isTouched:true})}/>
            <label className={`floating-label ${fullName.isTouched && fullName.name.length < 1 ? 'invalid-label' : ''}`} htmlFor="full-name">{type === 'user' ? 'Full Name' : 'Comapny Name'}</label>
          </div>
          <div className='input-field'>
            <input className={`input-form ${email.isTouched && email.email.length < 1 ? 'invalid-input' : ''}`} value={email.email} required id='email' type='email' onChange={e => setEmail({...email, email:e.target.value})} onBlur={() => setEmail({...email, isTouched:true})}/>
            <label className={`floating-label ${email.isTouched && email.email.length < 1 ? 'invalid-label' : ''}`} htmlFor='email'>Email Address</label>
          </div>
          <div className='combine-inputs'>
            <div className='input-field'>
              <input className={`input-form ${password.isTouched && !validatePasswordFormat(password.password) ? 'invalid-input' : ''}`} value={password.password} required id="password" type="password" onChange={e => setPassword({...password, password:e.target.value})} onBlur={() => setPassword({...password, isTouched:true})}/>
              <label className={`floating-label ${password.isTouched && !validatePasswordFormat(password.password) ? 'invalid-label' : ''}`} htmlFor="password">Password</label>
            </div>
            <div className='input-field'>
              <input className={`input-form ${confPassword.isTouched && !validatePasswordFormat(confPassword.password) ? 'invalid-input' : ''}`} value={confPassword.password} required id="con-password" type="password" onChange={e => setConfPassword({...confPassword, password:e.target.value})} onBlur={() => setConfPassword({...confPassword, isTouched:true})}/>
              <label className={`floating-label ${confPassword.isTouched && !validatePasswordFormat(confPassword.password) ? 'invalid-label' : ''}`} htmlFor="con-password">Confirm Password</label>
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
