import { Authcontext } from "@/app/Context/AuthContext";
import { DailyContext } from "@/app/Context/DailyContext";
import React, { useContext, useRef, useState } from "react";

export const Form = ({ fetchTodos }) => {
  const [formDate, SetFromDate] = useState({
    tittle: "",
    day: "",
    month: "",
    year: "",
    completed: false,
  });

  const { AuthData } = useContext(Authcontext);  // Get token from AuthContext
  const { addTodo1 } = useContext(DailyContext);
  const SetInput = useRef("");

  async function handleSubmit(time) {
    const token = localStorage.getItem("userData");
  
    if (!token) {
      alert("You must be logged in to add a task!");
      return;
    }
  
    let Data = formDate;
    let date = new Date();
  
    if (time === "today") {
      const status = await addTodo1({ token }, {
        ...Data,
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        completed: false,
      });
  
      if (status === 200) {
        fetchTodos();
      }
    }
  
    if (time === "tomorrow") {
      date.setDate(date.getDate() + 1);
      const status = await addTodo1({ token }, {
        ...Data,
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        completed: false,
      });
  
      if (status === 200) {
        fetchTodos();
      }
    }
  }
  

  return (
    <div className="form-container">
      <div className="form-group mb-3">
        <label htmlFor="tittle" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="tittle"
          ref={SetInput}
          onChange={(e) =>
            SetFromDate((prev) => {
              return { ...prev, tittle: e.target.value };
            })
          }
          placeholder="Enter task title"
        />
      </div>

      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            handleSubmit("today");
          }}
        >
          Add for Today
        </button>

        <button
          className="btn btn-secondary mx-2"
          onClick={() => {
            handleSubmit("tomorrow");
          }}
        >
          Add for Tomorrow
        </button>
      </div>

      {/* Inline Styles for Customization */}
      <style jsx>{`
        .form-container {
          background: rgba(255, 255, 255, 0.1);
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          max-width: 400px;
          margin: 20px auto;
          color: white;
        }

        .form-label {
          font-weight: bold;
          color: #f8f9fa;
        }

        .form-control {
          background-color: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          background-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
          border-color: #5b86e5;
        }

        .btn-primary {
          background-color: #36d1dc;
          border-color: #36d1dc;
          transition: transform 0.3s ease;
        }

        .btn-primary:hover {
          background-color: #5b86e5;
          border-color: #5b86e5;
          transform: scale(1.1);
        }

        .btn-secondary {
          background-color: #5b86e5;
          border-color: #5b86e5;
          transition: transform 0.3s ease;
        }

        .btn-secondary:hover {
          background-color: #36d1dc;
          border-color: #36d1dc;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};
