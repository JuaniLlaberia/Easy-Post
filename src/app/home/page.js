import CreatePost from "@/components/CreatePost"
import '../../assets/home.css'
import PostContainer from "@/components/PostContainer"
import GuardRoute from "@/components/GuardRoute"

const HomePage = () => {
  return (
    <main className='home-page'>
      <CreatePost />
      <PostContainer />
    </main>
  )
}

export default HomePage
