
import { Authcontext } from "@/app/Context/AuthContext";
import { DailyContext } from "@/app/Context/DailyContext";
import React, { useContext } from "react";
export const Today = ({ moveTaskHandler, fetchTodos }) => {
  const { NewObj, deleteTodos,moveToTomorrow } = useContext(DailyContext);
  const { AuthData } = useContext(Authcontext);

  async function handleDelete(id) {
    const status = await deleteTodos(AuthData, id);
    if (status == 200) {
      fetchTodos();
    }
  }

  async function moveTomorrow(id){
    const status = await moveToTomorrow(AuthData,id)
    if(status == 200){
      fetchTodos()
    }
  }
  return (
    <div
    >
      <h5
        className="card-title text-center mb-4"
        style={{
          fontWeight: "bold",
          color: "#495057",
        }}
      >
        Today Tasks
      </h5>
      <ol className="list-group list-group-numbered">
        {NewObj.todoList.today?.map((ele, i) => {
          // if (isOverdue) {
          return (
            <li
              key={i}

              className="list-group-item d-flex justify-content-between align-items-start mb-2"
              style={{
                borderRadius: "8px",
                color: "black",
                backgroundColor: "rgb(255, 255, 255)",
                // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="ms-2 me-auto">
                <div
                  className="fw-bold"
                  style={{
                    fontSize: "1rem",
                    color: "black",
                  }}
                >
                  {ele.tittle}
                </div>
                <small
                  style={{
                    color: "black",
                    fontWeight: '300'
                  }}
                >Date:
                  {ele.day}/{ele.month + 1}/{ele.year}
                </small>
              </div>

              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-3"
                  style={{
                    // transform: "scale(1.2)",
                    accentColor: "#0d6efd",
                  }}
                />

                <button

                  className="btn btn-sm border-danger "
                  onClick={() => handleDelete(ele._id)}
                  style={{
                    border: "1px solid white",
                    padding: "6px 8px",
                    fontSize: "0.85rem",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="red"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5V13a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5V5.5zM4 5.5v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h-1v7H5V5.5H4z" />
                    <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1h1v1h-1v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1V5h1V4zm1 .5v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-8H3.5z" />
                  </svg>
                </button>


                <button

                  className="btn btn-sm border-success"
                  onClick={() => moveTomorrow(ele._id)}
                  style={{
                    marginLeft:'5px',
                    border: "1px solid white",
                    padding: "6px 8px",
                    fontSize: "0.85rem",
                  }}
                >
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
</svg>
                </button>



              </div>
            </li>
          );


          return null;
        })}
      </ol>
    </div>
  );
};
