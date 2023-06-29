import PostItemFeed from "./PostItemFeed";

const PostContainerProfile = ({posts}) => {

  const myPostsToRender = posts?.map(post => {
    return <PostItemFeed key={post.id} date={post?.date?.seconds} id={post.id} by={post.userName} img={post.imgPath} likeNum={post.likesNum} userName={post.userName} userRef={post.imgRef} body={post.postBody} />
});
  return (
    <ul>
      {posts.length < 1 ? <p className='loading-msg'>No posts yet</p> : myPostsToRender}
    </ul>
  )
}

export default PostContainerProfile
