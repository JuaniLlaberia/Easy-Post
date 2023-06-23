import { formatDate } from "@/utils/formatDate"
import Image from "next/image"
import Link from "next/link"

const PostItemFeed = ({body, date,img, by, userName, userImg, id}) => {
    return (
    <li className='post-item-feed'>
        <Link href={`/home/profile/${userName}`} className='link-to-profile'>
            <Image src={userImg} width={50} height={50} alt="user"/>
            <h6>@{userName}</h6>
            <p>{formatDate(date)}</p>
        </Link>
        <Link href={`/home/post/${id}`} className='link-to-post'>
            <p>{body}</p>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  {img ? <Image src={img} width={400} alt="preview" height={300}/> : null}
            </div>
        </Link>
    </li>
  )
}

export default PostItemFeed
