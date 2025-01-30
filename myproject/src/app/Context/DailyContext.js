"use client"
import { API, axios } from "../Utils/Utils"
const {  createContext, Children, useReducer, act } = require("react")

let NewObj =  {}

async function addTodo1(authData, body) {
  API.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${authData.token}`;
  });
  const response = await axios.post("https://todo-b-yarv.onrender.com/user/addTodo", body);
  return response?.status
}

async function getAllTodos(authData){
  // console.log("sd");
  API.interceptors.request.use((req)=>{
    req.headers.Authorization = `Bearer ${authData.token}`
    return req
  })

    const response = await axios.get('https://todo-b-yarv.onrender.com/user/getData');
    return response?.data 

}


async function deleteTodos(authData,id){
  API.interceptors.request.use((req)=>{
    req.headers.Authorization = `Bearer ${authData.token}`
    return req
  })

  const response = await axios.delete(`https://todo-b-yarv.onrender.com/user/deleteDataById/${id}`)
  return response?.status
}
async function moveToTomorrow(authData,id){
  API.interceptors.request.use((req)=>{
    req.headers.Authorization =`Bearer ${authData.token}`
    return req;
  })

  const response = await axios.put(`https://todo-b-yarv.onrender.com/user/moveToTomorrow/${id}`)
  return response?.status
}
async function moveToToday(authData,id){
  API.interceptors.request.use((req)=>{
    req.headers.Authorization =`Bearer ${authData.token}`
    return req;
  })

  const response = await axios.put(`https://todo-b-yarv.onrender.com/user/moveToToday/${id}`)
  return response?.status
}
function reducer(state,action){
  try {
    switch(action.type){
      case "GET_ALL_TODOS":
        let todoState = {...state,...action.payload}
        console.log(todoState);
        return todoState; 
      default:
        return state;
    } 
  } catch (error) {
    console.log(error)
  }
}
export const DailyContext = createContext()

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, NewObj);

  return (
    <DailyContext.Provider value={{ NewObj: state, dispatch, getAllTodos, addTodo1,deleteTodos,moveToTomorrow,moveToToday}}>
      {children}
    </DailyContext.Provider>
  );
};
