import { db } from "@/firebase_config";
import { deleteDoc, doc } from "firebase/firestore";

export const deleteNotification = async (inboxId) => {
    try {
        await deleteDoc(doc(db, 'notifications', inboxId));
    } catch(err) {
        console.log(err);
    }
};