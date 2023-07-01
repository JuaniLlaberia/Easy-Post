'use client'

import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ClipLoader } from 'react-spinners'

const GuardRoute = ({children}) => {
  const {currentAcc} = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if(!currentAcc) {
      console.log(currentAcc);
      router.push('/account/login');
    }
  },  [currentAcc]);

  return (
    <>{!currentAcc ?
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', backgroundColor:'rgb(28, 28, 31)'}}>
         <ClipLoader color="#e981f7" size='50px'/>
        </div> : children}</>
  )
}

export default GuardRoute
