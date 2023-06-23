import { db } from "@/firebase_config";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";

export const unFollowUser = async (userToFollow, myUser) => {
        const userRef = doc(db, 'users', myUser);

        try {
            await updateDoc(userRef, {
                'following': arrayRemove(userToFollow),
            })
        } catch(err) {
            console.log(err);
        }
    };