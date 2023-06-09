'use client'

import { useAuthContext } from '@/context/AuthContext'
import '../../../../assets/account.css';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import CustomInput from '@/components/CustomInput';
import { ClipLoader } from 'react-spinners'

const UserSignUpPage = () => {
  const {createAccount, setCurrentAcc} = useAuthContext();
  const router = useRouter();
  const [email, setEmail] = useState({email:'', isTouched:false});
  const [password, setPassword] = useState({password:'', isTouched:false});
  const [confPassword, setConfPassword] = useState({password:'', isTouched:false});
  const { type } = useParams();
  const [loadingBtn, setLoadingBtn] = useState(false);

  useEffect(() => {
    setCurrentAcc(null)
  }, []);

  //Password validation
  const validatePasswordFormat = (password) => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})(?=.*[!@#$%^&*])");
    return strongRegex.test(password);
  };

  const handleNewUser = async e => {
    e.preventDefault();
    setLoadingBtn(false);

    //We check that the data is OK
    if(password.password !== confPassword.password) {
      console.log('Password dont match');
      return;
    };

    setLoadingBtn(true);

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
          <CustomInput classInput={`input-form ${email.isTouched && email.email.length < 1 ? 'invalid-input' : ''}`} classLabel={`floating-label ${email.isTouched && email.email.length < 1 ? 'invalid-label' : ''}`} value={email.email} id='email' required={true} readonly={false} type='email' onChange={e => setEmail({...email, email:e.target.value})} label='Email Address' onBlur={() => setEmail({...email, isTouched:true})}/>
          <div className='combine-inputs'>
            <CustomInput classInput={`input-form ${password.isTouched && !validatePasswordFormat(password.password) ? 'invalid-input' : ''}`} classLabel={`floating-label ${password.isTouched && !validatePasswordFormat(password.password) ? 'invalid-label' : ''}`} value={password.password} id='password' required={true} readonly={false} type='password' onChange={e => setPassword({...password, password:e.target.value})} onBlur={() => setPassword({...password, isTouched:true})} label='Password'/>
            <CustomInput classInput={`input-form ${password.isTouched && !validatePasswordFormat(password.password) ? 'invalid-input' : ''}`} classLabel={`floating-label ${password.isTouched && !validatePasswordFormat(password.password) ? 'invalid-label' : ''}`} value={confPassword.password} id='con-password' required={true} readonly={false} type='password' onChange={e => setConfPassword({...confPassword, password:e.target.value})} onBlur={() => setConfPassword({...confPassword, isTouched:true})} label='Confirm Password'/>
          </div>
          <div className='btns-container'>
            {/* <button className='create-acc-button'>Create Account</button> */}
            <button disabled={loadingBtn} className='create-acc-button'>{loadingBtn ? <ClipLoader color="#e981f7" size='20'/> : 'Create Account'}</button>
            <Link href='/account' className='login-already'>Already register?</Link>
          </div>
        </form>
        <Link href='/' className='go-back'><FontAwesomeIcon icon={faArrowLeftLong}/> Go back</Link>
    </main>
  )
}

export default UserSignUpPage
