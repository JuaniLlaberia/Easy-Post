import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/navbar.css'
import easyJobLogo from '../assets/easyJob_assets/easyJOB_app_logo_lg.png'
// import Link from 'next/link'
// import DropDownNotifications from './DropDownNotifications'
// import { useState } from "react";
import Link from "next/link";
import { faEnvelope, faStar, faUser, faHouse, faMagnifyingGlass  } from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {
    // const [isActive, setIsActive] = useState(false);

  return (
    <>
      <nav>
        <div className="sidebar-btns">
          <Link href='/home'><Image src={easyJobLogo} draggable={false} priority={true} alt='page logo'/></Link>
          <Link className='nav-btn' href='/home'><FontAwesomeIcon icon={faHouse}/> Home</Link>
          <Link className='nav-btn' href='/home/map'><FontAwesomeIcon icon={faMagnifyingGlass}/> Search</Link>
          <Link className='nav-btn' href='/home/trending'><FontAwesomeIcon icon={faStar}/> Trending</Link>
          <Link className='nav-btn' href='/home/map'><FontAwesomeIcon icon={faEnvelope}/> Inbox</Link>
          <Link className='nav-btn' href='/home/my-profile'><FontAwesomeIcon icon={faUser}/> Profile</Link>
        </div>
        <button>More</button>
            {/* <button className='toggle-nav' onClick={() => setIsActive(!isActive)}><FontAwesomeIcon size="2x" icon={isActive ? faArrowLeft : faBars}/></button> */}
      </nav>
      {/* {isActive && <div className='overlay' onClick={() => setIsActive(false)}></div>} */}
    </>
  )
}

export default Sidebar

//className={isActive ? 'active' : ''}