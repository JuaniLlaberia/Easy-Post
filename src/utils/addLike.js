import { db } from "@/firebase_config";
import { arrayUnion, doc, increment, updateDoc } from "firebase/firestore";

export const addLike = async (postId, username) => {
        const postRef = doc(db, 'posts', postId);
        try {
            await updateDoc(postRef, {
                'likedBy': arrayUnion(username),
                'likesNum': increment(1),
            })
        } catch(err) {
            console.log(err);
        }
    };