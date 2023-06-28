import PostItemFeed from "./PostItemFeed";

const PostContainerProfile = ({posts}) => {

  const myPostsToRender = posts?.map(post => {
    return <PostItemFeed key={post.postId} date={post?.postData?.date?.seconds} id={post.postId} by={post.postData.userName} img={post.postData.imgPath} likeNum={post.postData.likesNum} userName={post.postData.userName} userRef={post.postData.imgRef} body={post.postData.postBody} />
});
  return (
    <ul>
      {posts.length < 1 ? 'No posts yet' : myPostsToRender}
    </ul>
  )
}

export default PostContainerProfile
