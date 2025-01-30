import { Authcontext } from '@/app/Context/AuthContext';
import { DailyContext } from '@/app/Context/DailyContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'

export const Signin = ({setMode}) => {
  const [formData, setFormData] = useState({username:"",email:"",password:"",confirmPassword:""})
  const { signin,dispatch } = useContext(Authcontext);
  // const { dispatch} = useContext(DailyContext);
  const router = useRouter()

  async function handleSubmit() {
    try {
      if (formData?.username != "" && formData?.email != "" && formData?.password != "" && formData?.confirmPassword != "") {
        if(formData?.password == formData?.confirmPassword){
          const data = await signin(formData);
          console.log(data.dataToBeSaved
          )
          dispatch({
            type: "SIGN_IN",
            payload: data
          })
          if(data){
            router.push('/')
            // setMode(false)  
            console.log("as")
          }
        }else{
          alert("Passwords donot match")
        }
      } else {
        alert("Please fill out form")
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: "100%" }}>
      <div className="card p-3" style={{ backgroundColor: "transparent" }}>
        <h2>Signup Form!</h2>
        <input type="text" placeholder='Username' onChange={(e) => {
          setFormData(prev => {
            return {
              ...prev, username: e.target.value
            }
          })
        }} />
        <br />
        <input type="email" placeholder='Email' onChange={(e) => {
          setFormData(prev => {
            return {
              ...prev, email: e.target.value
            }
          })
        }} />
        <br />
        <input type="password" placeholder='Password' onChange={(e) => {
          setFormData(prev => {
            return {
              ...prev, password: e.target.value
            }
          })
        }} />
        <br />
        <input type="password" placeholder='Confirm Password' onChange={(e) => {
          setFormData(prev => {
            return {
              ...prev, confirmPassword: e.target.value
            }
          })
        }} />
        <br />
        Profile
        <input type="file" onChange={(e) => {
          const fileReader = new FileReader()
          fileReader.readAsDataURL(e.target.files[0]);
          fileReader.addEventListener("load", (e) => {
            setFormData(prev => {
              return {
                ...prev, profilePicture: e.currentTarget.result
              }
            })
          })
        }} />
        <br />
        <div>
          <img src={formData.profilePicture} style={{ width: "200px", height: "200px" }} alt="" />
        </div>
        <br />
        <button className='btn btn-primary' onClick={()=>{
          handleSubmit()
        }}>Signup!</button>
        <br />
        <button className='btn' onClick={() => {
          router.push("/Auth/login")
        }}>Already have an account? Signin!</button>
      </div>
    </div>
  )
}
