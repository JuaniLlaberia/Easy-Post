import { db } from "@/firebase_config";
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";

export const followUser = async (userToFollowId, userToFollow, myUser, myUsername) => {
        const userRefSender = doc(db, 'users', myUser);

        try {
            await updateDoc(userRefSender, {
                'following': arrayUnion(userToFollowId),
            });
            await addDoc(collection(db, 'notifications'), {
                msg:'started following you.',
                time: serverTimestamp(),
                id: uuid(),
                sender: myUsername,
                receiver: userToFollow,
            })
        } catch(err) {
            console.log(err);
        }
    };