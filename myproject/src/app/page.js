"use client"
import Image from "next/image";
import styles from "./page.module.css";

import { Main } from "./component/Home/Main";
import { useState } from "react";
import { Authmain } from "./Auth/Main/Authmain";
import { Login } from "./Auth/login/Login";



export default function Hello(){

  return(
    <div >
      <Main/>
    </div>  
  );
}

