import { MonthlyContext } from "@/app/Context/MonthlyContext";
import { useContext, useState, useEffect } from "react";
import "./Card.css"; // Import custom CSS
import { Authcontext } from "@/app/Context/AuthContext";

export const Cards = ({ fetchTodos }) => {
  const { MonthlyPlan, month, deleteTaskMonthly } = useContext(MonthlyContext);
  const { AuthData } = useContext(Authcontext);
  const [isLoading, setIsLoading] = useState(true);

  // Group tasks by month
  const groupedTasks = MonthlyPlan.reduce((acc, task) => {
    const taskMonthIndex = parseInt(task.month, 10) - 1; // Convert to zero-based index
    const taskMonth = month[taskMonthIndex];
    if (!acc[taskMonthIndex]) {
      acc[taskMonthIndex] = {
        name: taskMonth,
        tasks: [],
      };
    }
    acc[taskMonthIndex].tasks.push(task);
    return acc;
  }, {});

  // Sort tasks by month index
  const sortedGroupedTasks = Object.keys(groupedTasks)
    .sort((a, b) => a - b) // Sort by numeric month index
    .map((key) => groupedTasks[key]); // Map sorted keys back to values

  // Handle delete task
  async function handleDelete(id) {
    const status = await deleteTaskMonthly(AuthData, id);
    if (status === 200) {
      fetchTodos();
    }
  }

  // Set loading state
  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    }
  }, [MonthlyPlan]);

  return (
    <div className="row g-4 p-3 card-container">
      {sortedGroupedTasks.length > 0 ? (
        sortedGroupedTasks.map(({ name, tasks }) => (
          <div key={name} className="month-section">
            <h2 style={{ color: "white" }}>{name}</h2>
            <ol type="1">
              {tasks.map((task) => (
                <li key={task._id} style={{ color: "white", marginBottom: "10px" }}>
                  <div
                    className="card_month shadow-lg"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                  >
                    <div className="d-flex row" style={{ justifyContent: "space-between", width: "50%" }}>
                      <p className="col" style={{ color: "white" }}>
                        <strong>Title:</strong> {task.tittle}
                      </p>
                      <p className="col">
                        <strong style={{ color: "white" }}>Date:</strong> {task.day}/{task.year}
                      </p>
                    </div>
                    <button
                      style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: "transparent",
                        color: "white",
                        border: "none",
                        outline: "none",
                      }}
                      onClick={() => handleDelete(task._id)}
                    >
                      x
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))
      ) : (
        <p style={{ color: "white" }}>No tasks available.</p>
      )}
    </div>
    
  );
};
