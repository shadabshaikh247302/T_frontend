"use client"
const { createContext, useReducer } = require("react")
import {axios} from "../Utils/Utils"
// import axios from 'axios';

let inititalState = {}

if(typeof window !== 'undefined'){
    inititalState = JSON.parse(localStorage.getItem("userData")) || {
        token : "",
        userId : ""
    }   
}else{
    inititalState={
        token:"",
        userId:""
    }
}

export const Authcontext = createContext()

async function login(body){
      try {
        const response=await axios.post("https://todo-b-yarv.onrender.com/auth/logIn",body)
        console.log(response.data)
        return response?.data
    } catch (error) {
        console.log(error);
    }
}

async function signin(body){
    try {
        const response = await axios.post("https://todo-b-yarv.onrender.com/auth/Signin",body)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

function reducer(state,action){
    switch (action.type) {
        case "SIGN_IN":
        case "LOGIN_IN":
        const singinState={...action.payload}
        localStorage.setItem('userData',JSON.stringify(singinState))
        return singinState;
        default:
            return state;
    }
}

export const Authprovider = ({children})=>{
    const [state, dispatch] = useReducer(reducer,inititalState)
    return(
    <Authcontext.Provider value={{AuthData:state, dispatch, signin: signin, login }}> 
        {children}
    </Authcontext.Provider>
    )
}
