import { db } from "@/firebase_config";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export const followUser = async (userToFollow, myUser) => {
        const userRef = doc(db, 'users', myUser);

        try {
            await updateDoc(userRef, {
                'following': arrayUnion(userToFollow),
            })
        } catch(err) {
            console.log(err);
        }
    };