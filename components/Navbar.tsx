"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import styles from "@/app/page.module.css";
import { usePathname, useRouter } from "next/navigation";
import { UserResponse } from "@supabase/supabase-js";
import { ColorPallet } from "../types/types";
import { themes } from "../utils/themes";
type NavbarProps = {
    theme?:string
}
const Navbar:React.FC<NavbarProps> = ({theme}) => {
  const router = usePathname()
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("");
  const [hidePage,setHidePage]=useState(true)
  const [newAccount, setNewAccount] = useState(false);
  const [user, setUser] = useState<UserResponse>();
  let context = useAuthContext();
  const checkuser = async () => {
    let supa = context.client;
    let res = await supa?.auth.getUser();
    setUser(res);
    if (res?.data.user) {
      setLoggedIn(true);
      let url = await supa
        ?.from("TreePages")
        .select()
        .eq("email", res?.data.user?.email);
        if (url?.data?.[0]) {
        router.split("/")[2]!=url?.data?.[0].url&&setHidePage(false)
        setPage(url?.data?.[0].url);
      } else {
        setNewAccount(true);
      }
    } else {
      setLoggedIn(false);
    }
    setLoading(false);
  };
  // const createPage = async() => {
  //   console.log('id', user?.data.user?.id.length)
  //   let supa = context.client;
  //  let res= await supa
  //     ?.from("TreePages")
  //     .insert({
  //       name: "",
  //       special_links: [],
  //       links: [],
  //       url: user?.data.user?.id,
  //       pfp:user?.data.user?.id+"/pfp.png",
  //       email:user?.data.user?.email,
  //       theme:themes[0]
  //     });
// console.log(res)
// router.push("/update")
//   };
  useEffect(() => {
    checkuser();
  }, []);
  const handleSignOut = async () => {
    let res = await context?.client?.auth.signOut();
    checkuser();
    console.log(res);
  };
  return (
    <>
      {!loggedIn && !loading && (
        <a
        
          style={{
            zIndex:10,
            borderRadius:"1em",
            padding:"0.7em",
            backgroundColor:themes[theme?theme as keyof typeof themes:"green"]?.link,
            color: themes[theme?theme as keyof typeof themes:"green" ]?.text,
            textDecoration: "none",
            position: "fixed",
          }}
          href={`/login`}
        >
          Log In
        </a>
      )}
    {/* {newAccount&& <>
          <p
            style={{ position:"fixed", cursor: "pointer",color:"white"}}
            onClick={() => {
              createPage();
            }}
          >
            Create Page
          </p>
        </>} */}
      {loggedIn && !newAccount &&
        <div  className={styles.navbar}>
          <p
            style={{ top:"1em", position:"fixed", cursor: "pointer",zIndex:10 }}
            onClick={() => {
              handleSignOut();
            }}
          >
            Signout
          </p>
          <a style={{zIndex:10}} href="/update">Edit</a>
         {!hidePage&& <a style={{zIndex:10}}  href={`/page/${page}`}>My Page</a>}
        </div>
      }
    </>
  );
};

export default Navbar;
