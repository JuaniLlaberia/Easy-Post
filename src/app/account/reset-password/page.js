'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../assets/account.css'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useAuthContext } from '@/context/AuthContext'
import { useEffect, useState } from 'react'
import CustomInput from '@/components/CustomInput'
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons'

const ResetPasswordPage = () => {
  const { resetPassword } = useAuthContext();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const newPassword = async () => {
    if(!email) return;

    try {
        await resetPassword(email);
    }catch(err) {
        console.log(err);
        setError('Failed to sent email')
    }
    setEmail('');
  };

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 3500);
  }, [error]);

  return (
    <main className='reset-password-page'>
        <form className='user-new-form' onSubmit={e => e.preventDefault()}>
            <div style={{marginBottom:'15px'}}>
                <h1>Reset Password</h1>
                <p>You will receive all the information needed at your email shortly</p>
            </div>
            <CustomInput classInput='input-form' classLabel='floating-label' value={email} id='reset-field' required={true} readonly={false} type='text' onChange={e => setEmail(e.target.value)} label='Email Address'/>
            <div className='btns-container'>
                <button className='reset-btn' onClick={() => newPassword(email)}>Reset</button>
            </div>
        </form>
        <Link href='/account/login' className='go-back'><FontAwesomeIcon icon={faArrowLeftLong}/> Go back</Link>
        {error ? <p className='error-msg-acc'><FontAwesomeIcon color='red' icon={faXmarkCircle}/>{error}</p> : null}
    </main>
  )
}


export default ResetPasswordPage
