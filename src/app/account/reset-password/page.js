'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../assets/account.css'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useAuthContext } from '@/context/AuthContext'
import { useState } from 'react'

const ResetPasswordPage = () => {
  const { resetPassword } = useAuthContext();
  const [email, setEmail] = useState('');

  const newPassword = async () => {
    if(!email) return;

    try {
        await resetPassword(email);
    } catch(err) {
        console.log(err);
    }
    setEmail('');
  };

  return (
    <main className='reset-password-page'>
        <form className='user-new-form' onSubmit={e => e.preventDefault()}>
            <div style={{marginBottom:'15px'}}>
                <h1>Reset Password</h1>
                <p>You will receive all the information needed at your email shortly</p>
            </div>
            <div className='input-field'>
                <input value={email} className='input-form' required type='text' id='reset-field' onChange={e => setEmail(e.target.value)}/>
                <label className='floating-label' htmlFor="reset-field">Email Address</label>
            </div>
            <div className='btns-container'>
                <button className='reset-btn' onClick={() => newPassword(email)}>Reset</button>
            </div>
        </form>
        <Link href='/account' className='go-back'><FontAwesomeIcon icon={faArrowLeftLong}/> Go back</Link>
    </main>
  )
}


export default ResetPasswordPage
