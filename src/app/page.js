import Image from 'next/image'
import '../assets/home.css'
import LoginBanner from "@/components/LoginBanner"
import img from '../assets/landing_page_img.png'

const InitialPage = () => {
  return (
    <main className='landing-page'>
      <LoginBanner />
      <Image src={img} width={400} draggable={false} className='img-landingpage'/>
    </main>
  )
}

export default InitialPage
