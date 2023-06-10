import Image from 'next/image'
import '../assets/navbar.css'
import easyJobLogo from '../assets/easyJob_assets/easyJOB.png'
import Link from 'next/link'
import DropDownBtn from './DropDownBtn'

const Navbar = () => {
  return (
    <nav>
      <Link href='/home'><Image src={easyJobLogo} draggable={false} priority={true} alt='page logo'/></Link>
      <div className='nav-btns'>
        <Link className='nav-btn' href='/home/map'>Search</Link>
        <Link className='nav-btn' href='/home/map'>Inbox</Link>
        <Link className='nav-btn' href='/home/map'>Saved</Link>
        <DropDownBtn/>
      </div>
    </nav>
  )
}

export default Navbar
