import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../page/style.css";

function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(
        `https://rocky-temple-83495.herokuapp.com/employees/${id}`
      );
      setEmployee(response.data);
    } catch (error) {
      console.log("Error fetching employee data:", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get("https://rocky-temple-83495.herokuapp.com/tasks")
      .then((response) => {
        console.log("Tasks response:", response.data);
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  useEffect(() => {
    axios
      .get("https://rocky-temple-83495.herokuapp.com/tasks ")
      .then((response) => {
        console.log("Employee options:", response.data);
        const employees = response.data;
        setEmployeeOptions(employees);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="EmployeDetalscss">
      <h1>Page {employee.name}</h1>
      <p className="pdetals">Name: {employee.name}</p>
      <p className="pdetals">Surname: {employee.surname}</p>
      <p className="pdetals">Email: {employee.email}</p>
      <p className="pdetals">Position: {employee.position}</p>
      
    </div>
  );
}

export default EmployeeDetails;
