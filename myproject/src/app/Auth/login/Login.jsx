import React, { useContext, useState } from "react";
// import * as React from 'react';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useRouter } from "next/navigation";
import { Authcontext, authcontext } from "@/app/Context/AuthContext";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const Login = ({setmode1,setmode}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show1) => !show1);
  
  const [FormData, setFromData] = useState({
    email: "",
    password: "",
  });
  
  const { login, dispatch } = useContext(Authcontext);
  
  const router = useRouter()

  async function handleSubmit() {
   
    
      if(FormData?.email !=""  && FormData?.password != ""){
        const data = await login(FormData);   
        if(data){
          dispatch({
            type: "LOGIN_IN",
            payload : data
          })
          // console.log(data + " " + "adsasdf")
          router.push("/")
        }
      }else{
        alert("Kindly fill the login form");
      }   
    } 
  

  return (
    <div
      class="shadow bg-white"
      style={{ border: "0px solid black", width: "400px", height: "305px" }}>
        <div style={{border:'0px solid black'}}>
          <h4 className="m-2 d-flex  justify-content-center align-items-center">Login Form</h4>
        </div>
      <div>
        <Box
          component="form"
          sx={{ "& > :not(style)": { width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
         
          <TextField
            onChange={(e) => {
              setFromData((prev) => {
                return { ...prev, email: e.target.value };
              });
            }}
            style={{ width: "95%", margin: "10px" }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <div>
            <FormControl
              sx={{ width: "150%", margin: "10px"  }}
              style={{ margin: "10px" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                onChange={(e) => {
                  setFromData((prev) => {
                    return { ...prev, password: e.target.value };
                  });
                }}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password "
              />
            </FormControl>
          </div>
       

          <div
            style={{
              border: "0px solid black",
              width: "95%",
              margin: "auto",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "centre",
            }}
          >
          </div>
        </Box>
        <div
          style={{
            border: "0px solid black",
            width: "95%",
            margin: "auto",
            marginTop: "24px",
          }}
        >
          <button
            onClick={() => {
              handleSubmit();
            }}
            className="btn btn-primary"
            style={{ border: "0px solid black", width: "100%", margin: "auto" }}
          >Login!
          </button>
        </div>

        <div
          className="alrdyHaveAnAccnt my-3 d-flex justify-content-center"
          style={{ width: "95%", margin: "auto", marginTop: "25px" }}
        >
          <button
            onClick={() => {
              router.push("Signin");
            }}
            style={{
              backgroundColor: "transparent",
              fontWeight: "600",
              border: "none",
              outline: "none",
              fontSize: "12px",
            }}
          >
            New user ?
          </button>
        </div>
      </div>
    </div>
  );
};
