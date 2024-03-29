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
  theme?: string;
};
const Navbar: React.FC<NavbarProps> = ({ theme }) => {
  const router = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("");
  const [hidePage, setHidePage] = useState(true);
  const [newAccount, setNewAccount] = useState(false);
  const [route, setRoute] = useState<string[]>([]);

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
        setPage(url?.data?.[0].url);
      } else {
        setNewAccount(true);
      }
    } else {
      setLoggedIn(false);
    }
    setRoute(router.split("/"));
    setLoading(false);
  };
  useEffect(() => {
    checkuser();
  }, []);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      const updateWindowDimensions = () => {
        const newWidth = window.innerWidth;
        setWidth(newWidth);
      };

      window.addEventListener("resize", updateWindowDimensions);
      updateWindowDimensions();
      return () => window.removeEventListener("resize", updateWindowDimensions);
    } else {
      setWidth(1920);
    }
  }, []);
  const handleSignOut = async () => {
    let res = await context?.client?.auth.signOut();
    checkuser();
    console.log(res);
  };
  const navtheme = themes[theme ? (theme as keyof typeof themes) : "green"];
  return (
    <div
      style={
        width > 800
          ? { flexDirection: "column" }
          : {
              paddingBottom: "1em",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }
      }
      className={styles.navbar}
    >
      {!loggedIn && !loading && (
        <a
          style={{
            zIndex: 10,
            borderRadius: "1em",
            padding: "0.7em",
            borderColor: navtheme.text,
            borderStyle: "solid",
            borderWidth: navtheme.linkStyle == "solid" ? "0em" : "0.2em",
            backgroundColor: navtheme.linkStyle == "solid" ? navtheme.link : "",
            color: navtheme?.text,
            textDecoration: "none",
          }}
          href={`/login`}
        >
          Log In
        </a>
      )}
      {loggedIn && !newAccount && (
        <>
          <div
            style={{
              zIndex: 10,
              borderRadius: "1em",
              padding: "0.7em",
              borderColor: navtheme.text,
              borderStyle: "solid",
              borderWidth: navtheme.linkStyle == "solid" ? "0em" : "0.2em",
              backgroundColor:
                navtheme.linkStyle == "solid" ? navtheme.link : "",
              color: navtheme?.text,
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              handleSignOut();
            }}
          >
            Signout
          </div>
          {route[2] == page && (
            <a
              style={{
                zIndex: 10,
                borderRadius: "1em",
                padding: "0.7em",
                borderColor: navtheme.text,
                borderStyle: "solid",
                borderWidth: navtheme.linkStyle == "solid" ? "0em" : "0.2em",
                backgroundColor:
                  navtheme.linkStyle == "solid" ? navtheme.link : "",
                color: navtheme?.text,
                textDecoration: "none",
                cursor: "pointer",
              }}
              href="/update"
            >
              Edit
            </a>
          )}
          {route[1] && route[2] != page && (
            <a
              style={{
                zIndex: 10,
                borderRadius: "1em",
                padding: "0.7em",
                borderColor: navtheme.text,
                borderStyle: "solid",
                borderWidth: navtheme.linkStyle == "solid" ? "0em" : "0.2em",
                backgroundColor:
                  navtheme.linkStyle == "solid" ? navtheme.link : "",
                color: navtheme?.text,
                textDecoration: "none",
                cursor: "pointer",
              }}
              href={`/page/${page}`}
            >
              My Page
            </a>
          )}
        </>
      )}
      {route[1] && route[1] != "about" && (
        <a
          style={{
            zIndex: 10,
            borderRadius: "1em",
            padding: "0.7em",
            borderColor: navtheme.text,
            borderStyle: "solid",
            borderWidth: navtheme.linkStyle == "solid" ? "0em" : "0.2em",
            backgroundColor: navtheme.linkStyle == "solid" ? navtheme.link : "",
            color: navtheme?.text,
            textDecoration: "none",
            cursor: "pointer",
          }}
          href={`/about`}
        >
          About
        </a>
      )}
    </div>
  );
};

export default Navbar;
