import '../assets/landing-page.css'
import Link from "next/link"


const LoginBanner = () => {
  return (
      <div className='login-card'>
        <h1 className='easypost-title'>easyPOST</h1>
        <div className='landingpage-texts'>
          <h3 className='easypost-subtitle'>Get full access by creating an account</h3>
          <p className='easypost-phrase'>"Don't think about likes or followers, think about the adventure"</p>
        </div>
        <div className="landing-page-btns">
          <Link href='/account/new'>Sign Up</Link>
          <Link href='/account/login'>Log In</Link>
        </div>
      </div>
  )
}

export default LoginBanner
