import Link from "next/link";
import './globals.css'

export default function MainPage() {
  return (
    <main className='landing-page'>
      <h2>easyJOB</h2>
      <p>"small description text of the application as a introduction to the product"</p>
      <div className='main-btns'>
        <Link href='/account/user' className='initial-btn'>Individual</Link>
        <Link href='/account/company' className='initial-btn'>Company</Link>
      </div>
      <Link href='/account' className='login-btn'>Log in</Link>
    </main>
  )
}
