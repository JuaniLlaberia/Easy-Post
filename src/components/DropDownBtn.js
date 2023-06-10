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
              <button onClick={handleLogOut} className='logout-btn-nav'>Log Out</button>
         </div>
     </div>
  )
}

export default DropDownBtn
