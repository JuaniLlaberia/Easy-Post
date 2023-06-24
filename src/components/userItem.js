import Image from "next/image"
import Link from "next/link"

const UserItem = ({userImg, username}) => {
  return (
    <li className="search-user-result">
        <Link href={`/home/profile/${username}`}>
            {userImg ? <Image src={userImg} width={70} height={70} alt="user"/> : null}
            <h6>{username}</h6>
        </Link>
    </li>
  )
}

export default UserItem
