"use client";

import { useState } from "react";

import AuthContextProvider from "../../../context/AuthContext";
import UpdateContainer from "./UpdateField/UpdateContainer";
import Navbar from "../../../components/Navbar";
import CheckUser from "../../../components/CheckUser";

export default function Home() {
    
  
  return (<>
  <AuthContextProvider>
    <UpdateContainer/>
  </AuthContextProvider>
  </>);
}
