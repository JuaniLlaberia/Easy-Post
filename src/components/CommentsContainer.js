import CommentItem from "./CommentItem"

const CommentsContainer = ({commentList}) => {
    const commentsToRender = commentList?.map(comment => {
        return <CommentItem key={comment.commentId} userName={comment.userName} commentBody={comment.commentBody} userImg={comment.userImg}/>
    })

  return (
    <ul className='comments-container'>
      {commentsToRender}
    </ul>
  )
}

export default CommentsContainer
