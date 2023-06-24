import Link from "next/link"

const LoginBanner = () => {
  return (
      <div className='login-card'>
        <div>
          <h3>By having an account you will have 100% access</h3>
          <p>Filling text filling text filling text</p>
        </div>
        <div>
          <Link href='/account/new'>Sign Up</Link>
          <Link href='/account/login'>Log In</Link>
        </div>
      </div>
  )
}

export default LoginBanner
