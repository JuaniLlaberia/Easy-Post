import CreatePost from "@/components/CreatePost"
import MainPostContainer from "@/components/MainPostContainer"
import '../../assets/home.css'

const HomePage = () => {
  return (
    <main className='home-page'>
      <CreatePost />
      <MainPostContainer />
    </main>
  )
}

export default HomePage
