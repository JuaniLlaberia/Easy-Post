'use client'

import { useAuthContext } from '@/context/AuthContext'
import '../../../assets/account.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import CustomInput from '@/components/CustomInput';
import { ClipLoader } from 'react-spinners'
import { collection, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { db } from '@/firebase_config';

const UserSignUpPage = () => {
  const {createAccount} = useAuthContext();
  const router = useRouter();
  const [email, setEmail] = useState({email:'', isTouched:false});
  const [username, setUsername] = useState({username:'', isTouched:false});
  const [password, setPassword] = useState({password:'', isTouched:false});
  const [confPassword, setConfPassword] = useState({password:'', isTouched:false});
  const [loadingBtn, setLoadingBtn] = useState(false);

  //Password validation
  const validatePasswordFormat = (password) => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})(?=.*[!@#$%^&*])");
    return strongRegex.test(password);
  };

  //New user
  const handleNewUser = async e => {
    e.preventDefault();
    setLoadingBtn(false);

    //We check that the data is OK
    if(password.password !== confPassword.password) {
      console.log('Password dont match');
      return;
    };

    setLoadingBtn(true);

    try {
    // Check if the username already exists
    const querySnapshot = await getDocs(
      query(collection(db, 'users'), where('username', '==', username.username))
    );

    if (!querySnapshot.empty) {
      //Render some UI ERROR
      console.log('Username already taken');
      setLoadingBtn(false);
      return;
    }

      //Creating account
    const { user } = await createAccount(email.email, password.password);

      //Store user data in database
    await setDoc(doc(db, 'users', user.uid), {
        email: email.email,
        username: username.username,
        userId: user.uid,
        date: serverTimestamp(),
        userImg:'https://firebasestorage.googleapis.com/v0/b/jobs-search-app.appspot.com/o/user_placeholder.png?alt=media&token=82bdb08d-e5eb-40e1-8d15-ccef470959d1&_gl=1*1fxd68*_ga*NTE1MzQ4MjUwLjE2ODM1NDIwOTQ.*_ga_CW55HF8NVT*MTY4NjQ2ODQ4My4yMS4xLjE2ODY0NzU0MTAuMC4wLjA.',
        userImgId:''
      });
      //Redirect user to homepage
      router.push(`/home`);
    } catch(err) {
      console.log(err);
      setLoadingBtn(false);
    };
  };

  return (
    <main className='user-signin-page'>
        <form className='user-new-form' onSubmit={handleNewUser}>
          <div>
            <h1 className='form-title'>Sign Up</h1>
            <p className='form-subtitle'>Let's create a new account</p>
          </div>
          <CustomInput classInput={`input-form ${email.isTouched && email.email.length < 1 ? 'invalid-input' : ''}`} classLabel={`floating-label ${email.isTouched && email.email.length < 1 ? 'invalid-label' : ''}`} value={email.email} id='email' required={true} readonly={false} type='email' onChange={e => setEmail({...email, email:e.target.value})} label='Email Address' onBlur={() => setEmail({...email, isTouched:true})}/>
          <CustomInput classInput={`input-form ${username.isTouched && username.username.length < 1 ? 'invalid-input' : ''}`} classLabel={`floating-label ${username.isTouched && username.username.length < 1 ? 'invalid-label' : ''}`} value={username.username} id='username' required={true} readonly={false} type='text' onChange={e => setUsername({...username, username:e.target.value})} label='Username' onBlur={() => setUsername({...username, isTouched:true})}/>
          <div className='combine-inputs'>
            <CustomInput classInput={`input-form ${password.isTouched && !validatePasswordFormat(password.password) ? 'invalid-input' : ''}`} classLabel={`floating-label ${password.isTouched && !validatePasswordFormat(password.password) ? 'invalid-label' : ''}`} value={password.password} id='password' required={true} readonly={false} type='password' onChange={e => setPassword({...password, password:e.target.value})} onBlur={() => setPassword({...password, isTouched:true})} label='Password'/>
            <CustomInput classInput={`input-form ${confPassword.isTouched && !validatePasswordFormat(confPassword.password) ? 'invalid-input' : ''}`} classLabel={`floating-label ${confPassword.isTouched && !validatePasswordFormat(confPassword.password) ? 'invalid-label' : ''}`} value={confPassword.password} id='con-password' required={true} readonly={false} type='password' onChange={e => setConfPassword({...confPassword, password:e.target.value})} onBlur={() => setConfPassword({...confPassword, isTouched:true})} label='Confirm Password'/>
          </div>
          <div className='btns-container'>
            <button disabled={loadingBtn} className='create-acc-button'>{loadingBtn ? <ClipLoader color="#e981f7" size='20px'/> : 'Create Account'}</button>
            <Link href='/account' className='login-already'>Already register?</Link>
          </div>
        </form>
        <Link href='/' className='go-back'><FontAwesomeIcon icon={faArrowLeftLong}/> Go back</Link>
    </main>
  )
}

export default UserSignUpPage
