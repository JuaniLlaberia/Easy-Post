import Image from 'next/image'
import '../assets/navbar.css'
import easyJobLogo from '../assets/easyJob_assets/easyJOB.png'
import Link from 'next/link'
import DropDownNotifications from './DropDownNotifications'

const Navbar = () => {
  return (
    <nav>
      <Link href='/home'><Image src={easyJobLogo} draggable={false} priority={true} alt='page logo'/></Link>
      <div className='nav-btns'>
        <Link className='nav-btn' href='/home/map'>Search</Link>
        <Link className='nav-btn' href='/home/my-profile'>Profile</Link>
        <DropDownNotifications/>
      </div>
    </nav>
  )
}

export default Navbar
