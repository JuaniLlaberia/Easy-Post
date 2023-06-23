import { db } from "@/firebase_config";
import { arrayRemove, doc, increment, updateDoc } from "firebase/firestore";

export const unLike = async (postId, username) => {
        const postRef = doc(db, 'posts', postId);
        try {
            await updateDoc(postRef, {
                'likedBy': arrayRemove(username),
                'likesNum': increment(-1),
            })
        } catch(err) {
            console.log(err);
        }
    };