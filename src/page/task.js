import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Task.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [updatedData, setUpdatedData] = useState({});
  const history = useHistory();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://rocky-temple-83495.herokuapp.com/tasks"
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    employeeId: "",
    task: "",
  });

  const [employeeOptions, setEmployeeOptions] = useState([]);

  useEffect(() => {
    axios
      .get("https://rocky-temple-83495.herokuapp.com/employees")
      .then((response) => {
        const employees = response.data;
        setEmployeeOptions(employees);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("https://rocky-temple-83495.herokuapp.com/tasks", formData)
      .then((response) => {
        console.log("Task created:", response.data);

        setFormData({
          name: "",
          description: "",
          startDate: "",
          endDate: "",
          employeeId: "",
          task: "",
        });

        fetchTasks(); // Update the task list after the task is created
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const deleteTask = (taskId) => {
    axios
      .delete(`https://rocky-temple-83495.herokuapp.com/tasks/${taskId}`)
      .then((response) => {
        console.log("Task deleted:", response.data);
        fetchTasks();
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };
  const updateTask = (taskId, updatedData) => {
    axios
      .put(
        `https://rocky-temple-83495.herokuapp.com/tasks/${taskId}`,
        updatedData
      )
      .then((response) => {
        console.log("Task updated:", response.data);

        fetchTasks();
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };
  const handleEmployeeClick = (id) => {
    history.push(`/employeePages/${id}`);
  };

  return (
    <div>
      <h1>Tasks</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Task:
          <input
            type="text"
            name="task"
            value={formData.task}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Start Date:
          <input
            className="input1"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Employee:
          <select
            name="employeeId"
            value={formData.employeeId}
            onChange={handleInputChange}
          >
            <option value="">Select Employee</option>
            {employeeOptions.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name} {employee.surname}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Create Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <p>Name: {task.name}</p>
            <p>Task: {task.task},</p>
            <p>Start Date: {task.startDate}</p>
            <p>End Date: {task.endDate}</p>
            <p>Employee ID: {task.employeeId}</p>

            <button onClick={() => updateTask(task.id, updatedData)}>
              Update
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => handleEmployeeClick(task.id)}>
              Page {task.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
