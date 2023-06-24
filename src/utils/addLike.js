import { db } from "@/firebase_config";
import { addDoc, arrayUnion, collection, doc, increment, serverTimestamp, updateDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";


export const addLike = async (postId, senderUser, receiverUser) => {
        const postRef = doc(db, 'posts', postId);
        try {
            await updateDoc(postRef, {
                'likedBy': arrayUnion(senderUser),
                'likesNum': increment(1),
            });
            await addDoc(collection(db, 'notifications'), {
                msg:`@${senderUser} liked your post.`,
                time: serverTimestamp(),
                id: uuid(),
                sender: senderUser,
                receiver: receiverUser,
            })
        } catch(err) {
            console.log(err);
        }
    };