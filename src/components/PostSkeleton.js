const PostSkeleton = () => {
  return (
    <div className="skeleton-bg">
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
          <div className='post-skeleton img'></div>
          <h1 className='post-skeleton big'></h1>
        </div>
       <div style={{display:'flex', flexDirection:'column',alignItems:'center', marginTop:'10px'}}>
        <p className='post-skeleton long'></p>
        <p className='post-skeleton long'></p>
        <p className='post-skeleton long'></p>
        <p className='post-skeleton long'></p>
        <p className='post-skeleton long'></p>
       </div>
    </div>
  )
}

export default PostSkeleton
