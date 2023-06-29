import { db } from "@/firebase_config";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";


export const addFav = async (postId, userId) => {
        const userRef = doc(db, 'users', userId);
        try {
            await updateDoc(userRef, {
                'savedPosts': arrayUnion(postId),
            });
        } catch(err) {
            console.log(err);
        }
    };