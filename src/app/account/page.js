'use client'

import { useAuthContext } from "@/context/AuthContext"
import { useState } from "react";
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const {loginAccount, currentAcc} = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async e => {
    e.preventDefault();
    //Logging in
    try {
      await loginAccount(email, password);
    } catch(err) {
      console.log(err);
    }
    //Redirect to proper page if user => user and if company => company
    router.push('/home');
  };

  return (
    <main>
      <form onSubmit={handleLogin}>
        <input required value={email} type="email" placeholder="email" onChange={e => setEmail(e.target.value)}/>
        <input required value={password} type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
        <button>Log in</button>
      </form>
      <div>This user is logged in: {currentAcc?.uid}</div>
    </main>
  )
}

export default LoginPage
