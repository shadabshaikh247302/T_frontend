"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Form } from "./Form";
import { Previous } from "./Previous";
import { Tomorrow } from "./Tomorrow";
import "./loader.css";

import { DailyContext } from "@/app/Context/DailyContext";
import { Authcontext } from "@/app/Context/AuthContext";
import { Navbar } from "../navbar/Navbar";
import { Today } from "./Today";
// import { Today } from "./Today";

const Main = () => {
  const { NewObj, dispatch, getAllTodos } = useContext(DailyContext);
  const { AuthData } = useContext(Authcontext);  // Getting Auth Data from AuthContext
  // console.log(NewObj);
  
  const [ToDOs, SetTODOs] = useState(NewObj);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    SetTODOs(NewObj);
  }, [NewObj]);

  useEffect(() => {
    fetchTodos();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("toDo230", JSON.stringify(ToDOs));
  // }, [ToDOs]);

async function fetchTodos() {
  setLoading(true);
  const data = await getAllTodos(AuthData);
  dispatch({
    type: "GET_ALL_TODOS",
    payload: data?.allTodos,
  })
  setLoading(false)
}

  return (
    <div style={{ margin: "0px", padding: "0px" }}>
      <div style={{ margin: "0px", padding: "0px" }}>
        <Navbar />
      </div>
      <div className="main-container">
        <div className="form-wrapper my-3">
          <Form fetchTodos={fetchTodos} SetTODOs={SetTODOs} ToDOs={ToDOs} />
        </div>

        {loading ? (
              <div className="loader-container">
                <div className="dot-loader">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
        ) : (
          <div className="d-flex flex-column flex-md-row justify-content-around my-4 tasks-container">
            <div className="task-box previous-task m-2">
              {ToDOs?.previous?.length > 0 ? (
                <Previous fetchTodos={fetchTodos} />
              ) : (
                <p className="empty-task">Previous</p>
              )}
            </div>

            <div className="task-box today-task m-2">
              {NewObj?.todoList?.today?.length > 0 ? (
                <Today fetchTodos={fetchTodos}/>
                // <Today fetchTodos={fetchTodos} ToDOs={ToDOs} />
              ) : (
                <p className="empty-task">Today is Empty</p>
              )}
            </div>

            <div className="task-box tomorrow-task m-2">
              {NewObj?.todoList?.tomorrow?.length > 0 ? (
                <Tomorrow fetchTodos={fetchTodos} ToDOs={ToDOs} />
              ) : (
                <p className="empty-task">Tomorrow</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
