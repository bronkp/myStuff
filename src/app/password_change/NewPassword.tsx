"use client"
import React, { useState } from 'react'
import { useAuthContext } from '../../../context/AuthContext'
import styles from '@/app/page.module.css';
import { useRouter } from 'next/navigation';

const NewPassword:React.FC = () => {
  const router = useRouter()
    const [password,setPassword]=useState("")
    const [error,setError]=useState(false)
    const context = useAuthContext()
    const changePassword = async()=>{
      await context.client!.auth.refreshSession()
        const { data, error } = await context.client!.auth.updateUser({

            password: password
          
          })
          console.log(data,error)
          if(error){
            setError(true)
          }else{
            router.push("/")
          }
    }
  return (
    <><div style={{width:"100%", justifyContent:"center",alignItems:"center", display:"flex"}}>

    <div className={styles["login-box"]}>
    <input onChange={(e)=>setPassword(e.target.value)}/>
    Enter New Password
    <button disabled={!(password.length>6)} onClick={()=>changePassword()}>submit</button>
    </div>
    </div>
    </>
  )
}

export default NewPassword