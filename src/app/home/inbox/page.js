'use client'

import { useAuthContext } from "@/context/AuthContext"
import '../../../assets/inbox.css'
import InboxItem from "@/components/InboxItem";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "@/firebase_config";
import { ClipLoader } from "react-spinners";

const page = () => {
    const {userData} = useAuthContext();
    const [notifications, setNotifications] = useState([]);
    const [loadingBtn, setLoadingBtn] = useState(true);

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
            setNotifications(tempArr);
            setLoadingBtn(false);
        })
        return unsuscribe
    }, [userData]);

    const renderInbox = notifications?.map(msg => {
        return <InboxItem  key={msg.notificationId} inboxId={msg.notificationId} postId={msg.notificationInfo.postId} msg={msg.notificationInfo.msg} username={msg.notificationInfo.sender} time={msg.notificationInfo.time}/>
    })

  return (
    <main className='inbox-page'>
        <div className='inbox-header'>
            <h1>Inbox ({notifications?.length})</h1>
            <p>All your notifications are here</p>
        </div>
        <ul className='inbox-container'>
            {loadingBtn && <div className='inbox-container-msg'><ClipLoader color="#e981f7" size='50px'/></div>}
            {notifications?.length < 1 && !loadingBtn ? <div className='inbox-container-msg text'>No notifications</div> : renderInbox}
        </ul>
    </main>
  )
}

export default page
