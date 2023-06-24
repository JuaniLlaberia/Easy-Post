import Link from 'next/link'
import React from 'react'

const InboxItem = ({username, msg}) => {
  return (
    <li className='inbox-item'>
        <Link href={`/home/profile/${username}`} className='notification-msg'>{msg}</Link>
        <div className='notification-btns'>
            <p>12h</p>
            <button>D</button>
        </div>
    </li>
  )
}

export default InboxItem
