import Image from "next/image"

const CommentItem = ({commentBody, userImg, userName}) => {
  return (
    <li className='comment-item'>
        <div>
            <Image src={userImg} draggable={false} width={50} height={50} alt="user"/>
            <h6>{userName}</h6>
        </div>
        <p>{commentBody}</p>
    </li>
  )
}

export default CommentItem
