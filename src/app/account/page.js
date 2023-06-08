'use client'

import { useAuthContext } from "@/context/AuthContext"
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import '../../assets/account.css'

const LoginPage = () => {
  const {loginAccount} = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async e => {
    e.preventDefault();
    if(!email && !password) return;

    //Logging in
    try {
      await loginAccount(email, password);
    } catch(err) {
      console.log(err);
    }
    //Redirect home page
    router.push('/home');
  };

  return (
    <main className='user-signin-page'>
      <form className='user-new-form' onSubmit={handleLogin}>
        <h1>Log In</h1>
        <div className='input-field'>
          <input className="input-form" id="email" required value={email} type="text" onChange={e => setEmail(e.target.value)}/>
          <label className="floating-label" htmlFor="email">Email Address</label>
        </div>
        <div className='input-field'>
          <input className="input-form" id="password" required value={password} type="password" onChange={e => setPassword(e.target.value)}/>
          <label className="floating-label" htmlFor="password">Password</label>
        </div>
        <div className='btns-container'>
          <button className='create-acc-button'>Log in</button>
          <Link href='/account/reset-password'>Forgot password?</Link>
        </div>
      </form>
      <Link href='/' className='go-back'><FontAwesomeIcon icon={faArrowLeftLong}/> Go back</Link>
    </main>
  )
}

export default LoginPage
