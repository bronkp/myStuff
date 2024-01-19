import React from "react";
import styles from "@/app/page.module.css";
import { ColorPallet } from "../types/types";
type HeaderProps = {
  name: string;
  pfp: string;
  theme: string;
  demo: Boolean;
  width: number;
};

const Header: React.FC<HeaderProps> = ({ name, pfp, theme, demo, width }) => {
  return (
    <>
      <div
        style={{
          maxWidth:"100%",
          paddingTop:"0.2em",
          width: width < 800 ? width : "10em",
          marginTop: width > 800 ? "0em" : demo ? "0" : "0em",
          backgroundColor: "none",
          position: width > 800 ? "relative" : demo ? "relative" : "relative",
        }}
        className={styles.header}
      >
        {name}
      </div>
      {pfp && (
        <div
          className={styles.pfp}
          style={{
            backgroundImage: `url(${pfp})`,
            marginTop: demo ? "0em" : "10em",
          }}
        ></div>
      )}
    </>
  );
};

export default Header;
