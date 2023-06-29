'use client'

import { useAuthContext } from "@/context/AuthContext"
import { formatDate } from "@/utils/formatDate"
import { getDoc } from "firebase/firestore"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const PostItemFeed = ({body, date,img, userName, id, userRef}) => {
    const [userImg, setUserImg] = useState('');
    const {userData} = useAuthContext();

    useEffect(() => {
        const test = async () => {
        const data = await getDoc(userRef);
        setUserImg(data.data().userImg);
    };
    test()
  }, [userRef])

    return (
    <li className='post-item-feed'>
        <Link href={userData?.username === userName ? '/home/my-profile' : `/home/profile/${userName}`} className='link-to-profile'>
            {userImg ? <Image src={userImg} width={50} height={50} alt="user"/> : null}
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
