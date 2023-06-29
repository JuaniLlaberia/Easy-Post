import { db } from "@/firebase_config";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";


export const removeFav = async (postId, userId) => {
        const userRef = doc(db, 'users', userId);
        try {
            await updateDoc(userRef, {
                'savedPosts': arrayRemove(postId),
            });
        } catch(err) {
            console.log(err);
        }
    };