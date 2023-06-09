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
        {/* <form className='search-bar'>
          <input type='text' placeholder='Search jobs'/>
          <button>Search</button>
        </form> */}
        <Link className='nav-btn' href='/home/map'>Search</Link>
        <Link className='nav-btn' href='/home/map'>Inbox</Link>
        <DropDownBtn/>
        {/* <Link className='nav-btn' href='/home/my-profile'>Profile</Link> */}
      </div>
    </nav>
  )
}

export default Navbar
