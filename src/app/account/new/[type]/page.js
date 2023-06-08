'use client'

import { useAuthContext } from '@/context/AuthContext'
import '../../../../assets/account.css';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

const UserSignUpPage = () => {
  const {createAccount, setCurrentAcc} = useAuthContext();
  const router = useRouter();
  const [email, setEmail] = useState({email:'', isTouched:false});
  const [password, setPassword] = useState({password:'', isTouched:false});
  const [confPassword, setConfPassword] = useState({password:'', isTouched:false});
  const { type } = useParams();

  useEffect(() => {
    setCurrentAcc(null)
  }, [])

  //Password validation
  const validatePasswordFormat = (password) => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})(?=.*[!@#$%^&*])");
    return strongRegex.test(password);
  };

  const handleNewUser = async e => {
    e.preventDefault();

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

    //Redirect to profile page to finish data filling
    router.push(`/account/${type}/info`);
  };

  return (
    <main className='user-signin-page'>
        <form className='user-new-form' onSubmit={handleNewUser}>
          <div>
            <h1 className='form-title'>Sign Up</h1>
            <p className='form-subtitle'>Let's create a new {type} account</p>
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
