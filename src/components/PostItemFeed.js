import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"

const PostItemFeed = ({body, img, likeNum,by, userName, userImg, id}) => {
    return (
    <li className='post-item-feed'>
        <Link href={`/home/profile/${by}`} className='link-to-profile'>
            <Image src={userImg} width={50} height={50} alt="user"/>
            <h6>{userName}</h6>
            <p>06/12/2002</p>
        </Link>
        <Link href={`/home/post/${id}`} className='link-to-post'>
            <p>{body}</p>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  {img ? <Image src={img} width={400} alt="preview" height={300}/> : null}
            </div>
        </Link>
        <div className='post-btns'>
            <button className='post-btn'>{likeNum} <FontAwesomeIcon icon={faHeart}/></button>
            <button className='post-btn'><FontAwesomeIcon icon={faBookmark}/></button>
        </div>
    </li>
  )
}

export default PostItemFeed
