'use client'

import Link from "next/link"
import '../assets/navbar.css'
import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

const DropDownBtn = () => {
  const { logout } = useAuthContext();
  const router = useRouter();

  const handleLogOut = () => {
    logout();
    router.push('/');
  }

  return (
    <div className="dropdown">
        <Link  href='/home/my-profile' className='main-btn-nav'>Porfile</Link>
            <div className="dropdown-content">
                <Link className='main-btn-nav' href='/home/settings'>Settings</Link>
                <Link className='main-btn-nav' href='/home/saved-posts'>Saved Posts</Link>
                <button onClick={handleLogOut} className='logout-btn-nav'>Log Out</button>
         </div>
     </div>
  )
}

export default DropDownBtn
