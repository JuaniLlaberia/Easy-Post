import { deleteNotification } from '@/utils/deleteNotification'
import { formatDate } from '@/utils/formatDate'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

const InboxItem = ({username, msg, time, inboxId, postId}) => {
  return (
    <li className='inbox-item'>
        <p className='notification-msg'><Link href={`/home/profile/${username}`}>@{username}</Link> {msg} {postId ? <Link href={`/home/post/${postId}`}><FontAwesomeIcon icon={faAnglesRight}/></Link> : null}</p>
        <div className='notification-btns'>
            <p>{formatDate(time.seconds)}</p>
            <button onClick={() => deleteNotification(inboxId)}><FontAwesomeIcon icon={faTrashCan}/></button>
        </div>
    </li>
  )
}

export default InboxItem
