import Link from "next/link";
import './globals.css'

export default function MainPage() {
  return (
    <main className='landing-page'>
      <h2>easyPOST</h2>
      <p>"Search and post, the latest and trendiest jobs in the market in just minutes"</p>
      <div className='main-btns'>
        <Link href='/account/new' className='initial-btn'>Get Started</Link>
      </div>
      <Link href='/account' className='login-btn'>Your account</Link>
    </main>
  )
}
