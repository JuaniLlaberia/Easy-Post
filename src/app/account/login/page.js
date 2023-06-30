'use client'

import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import '../../../assets/account.css';
import CustomInput from "@/components/CustomInput";
import { ClipLoader } from 'react-spinners';
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";

const LoginPage = () => {
  const {loginAccount} = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async e => {
    e.preventDefault();

    setLoadingBtn(false);

    if(!email && !password) return;

    //Logging in
    try {
      setLoadingBtn(true);
      await loginAccount(email, password);
    } catch(err) {
      console.log(err);
      setError("Account doesn't exist");
      setLoadingBtn(false);
      return;
    }
    //Redirect home page
    router.push('/home');
  };

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 3500);
  }, [error]);

  return (
    <main className='user-signin-page'>
      <form className='user-new-form' onSubmit={handleLogin}>
        <h1>Log In</h1>
        <CustomInput classInput='input-form' classLabel='floating-label' value={email} id='email' required={true} readonly={false} type='text' onChange={e => setEmail(e.target.value)} label='Email Address'/>
        <CustomInput classInput='input-form' classLabel='floating-label' value={password} id='password' required={true} readonly={false} type='password' onChange={e => setPassword(e.target.value)} label='Password'/>
        <div className='btns-container'>
          <button disabled={loadingBtn} className='create-acc-button'>{loadingBtn ? <ClipLoader color="#e981f7" size={20}/> : 'Log in'}</button>
          <Link href='/account/reset-password'>Forgot password?</Link>
        </div>
      </form>
      <Link href='/' className='go-back'><FontAwesomeIcon icon={faArrowLeftLong}/> Go back</Link>
      {error ? <p className='error-msg-acc'><FontAwesomeIcon color='red' icon={faXmarkCircle}/>{error}</p> : null}
    </main>
  )
}

export default LoginPage
