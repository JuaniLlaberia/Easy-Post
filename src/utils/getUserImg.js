import { storage } from "@/firebase_config";
import { getDownloadURL, ref } from "firebase/storage";

export const test = async (userName) => {
      try {
        const imgRef = ref(storage, `ArkidesJr_userImg.png`);
        const newImgPath = await getDownloadURL(imgRef);
        console.log(newImgPath);
        return(newImgPath)
      } catch(err) {
        console.log(err);
      }
}
