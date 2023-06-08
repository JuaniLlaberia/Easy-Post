import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../assets/account.css'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const ResetPasswordPage = () => {
  return (
    <main className='reset-password-page'>
        <form className='user-new-form'>
            <div style={{marginBottom:'15px'}}>
                <h1>Reset Password</h1>
                <p>You will receive all the information needed at your email shortly</p>
            </div>
            <div className='input-field'>
                <input className='input-form' required type='text' id='reset-field'/>
                <label className='floating-label' htmlFor="reset-field">Email Address</label>
            </div>
            <div className='btns-container'>
                <button className='reset-btn'>Reset</button>
            </div>
        </form>
        <Link href='/account' className='go-back'><FontAwesomeIcon icon={faArrowLeftLong}/> Go back</Link>
    </main>
  )
}


export default ResetPasswordPage
