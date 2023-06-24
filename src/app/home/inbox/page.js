'use client'

import { useAuthContext } from "@/context/AuthContext"
import '../../../assets/inbox.css'
import InboxItem from "@/components/InboxItem";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "@/firebase_config";

const page = () => {
    const {userData} = useAuthContext();
    const [notifications, setNotifications] = useState();

    useEffect(() => {
        if (!userData) return;
        console.log('LD');
        const unsuscribe = onSnapshot(query(collection(db, 'notifications'), where('receiver', '==', userData?.username), orderBy('time', 'desc')), snapshot => {
            const tempArr = [];
            snapshot.forEach(notification => {
                tempArr.push({
                    notificationId: notification.id,
                    notificationInfo: notification.data(),
                })
            });
            console.log(tempArr);
            setNotifications(tempArr)
        })
        return unsuscribe
    }, [userData]);

    const renderInbox = notifications?.map(msg => {
        return <InboxItem  key={msg.notificationId} msg={msg.notificationInfo.msg} username={msg.notificationInfo.sender}/>
    })

  return (
    <main className='inbox-page'>
        <div>
            <h1>Inbox</h1>
            <p>All your notifications are here</p>
        </div>
        <ul className='inbox-container'>
            {notifications?.length < 1 ? <div>No notifications</div> : renderInbox}
        </ul>
    </main>
  )
}

export default page
