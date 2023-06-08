import Link from "next/link";
import './globals.css'

export default function MainPage() {
  return (
    <main className='landing-page'>
      <h2>easyJOB</h2>
      <p>"Search and post, the latest and trendiest jobs in the market in just minutes"</p>
      <div className='main-btns'>
        <Link href='/account/new/user' className='initial-btn'>Individual</Link>
        <Link href='/account/new/company' className='initial-btn'>Company</Link>
      </div>
      <Link href='/account' className='login-btn'>Your account</Link>
    </main>
  )
}
