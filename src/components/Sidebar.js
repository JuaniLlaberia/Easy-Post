'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/navbar.css'
import { useState } from "react";
import Link from "next/link";
import { faEnvelope, faStar, faUser, faHouse, faMagnifyingGlass, faArrowLeft, faBars, faRightFromBracket, faGear  } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const [isActive, setIsActive] = useState(false);
    const {currentAcc, logout} = useAuthContext();

    const router = useRouter();
    const logoutAcc = async () => {
      try {
        await logout();
        console.log('Goodbye');
        router.push('/');
      } catch(err) {
        console.log(err);
      }
  };

  return (
    <>
      <nav className={isActive ? 'active' : ''}>
        <div className="sidebar-btns">
          <Link className='nav-btn' onClick={() => setIsActive(false)} href='/home'><FontAwesomeIcon icon={faHouse}/> <span className='nav-btn-text'>Home</span></Link>
          <Link className='nav-btn' onClick={() => setIsActive(false)} href='/home/search'><FontAwesomeIcon icon={faMagnifyingGlass}/> <span className='nav-btn-text'>Search</span></Link>
          <Link className='nav-btn' onClick={() => setIsActive(false)} href='/home/trending'><FontAwesomeIcon icon={faStar}/> <span className='nav-btn-text'>Trending</span></Link>
          <Link className='nav-btn' onClick={() => setIsActive(false)} href='/home/inbox'><FontAwesomeIcon icon={faEnvelope}/> <span className='nav-btn-text'>Inbox</span></Link>
          <Link className='nav-btn' onClick={() => setIsActive(false)} href='/home/my-profile'><FontAwesomeIcon icon={faUser}/> <span className='nav-btn-text'>Profile</span></Link>
        </div>
        <div className='nav-bottom-btns'>
          <Link href='/home/settings' className='more' onClick={() => setIsActive(false)}><FontAwesomeIcon className='more-symbol' icon={faGear}/> <span className='more-text'>Settings</span></Link>
          <button className='toggle-nav' onClick={() => setIsActive(!isActive)}><FontAwesomeIcon size="2x" icon={isActive ? faArrowLeft : faBars}/></button>
          {!currentAcc ? null : <button className='more' onClick={logoutAcc}><FontAwesomeIcon className='more-symbol' icon={faRightFromBracket}/> <span className='more-text'>Log Out</span></button>}
        </div>
      </nav>
      {isActive && <div className='overlay' onClick={() => setIsActive(false)}></div>}

    </>
  )
}

export default Sidebar

