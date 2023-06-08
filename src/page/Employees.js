import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useParams, Route } from "react-router-dom";
import "./style.css";
import { useEffect } from "react";
import axios from "axios";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    position: "",
    task: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "https://rocky-temple-83495.herokuapp.com/employees"
      );
      setEmployees(response.data);
    } catch (error) {
      console.log("Error fetching employees:", error);
    }
  };

  const handleEmployeeClick = (id) => {
    history.push(`/employeePage/${id}`);
  };

  const handleShowData = async (employee) => {
    try {
      const response = await axios.get(
        `https://rocky-temple-83495.herokuapp.com/employees/${employee.id}`
      );
      setSelectedEmployee(response.data);
    } catch (error) {
      console.log("Error fetching employee data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://rocky-temple-83495.herokuapp.com/employees",
        formData
      );
      const newEmployee = response.data;
      setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
      setFormData({
        name: "",
        surname: "",
        email: "",
        position: "",
      });
    } catch (error) {
      console.log("Error creating employee:", error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(
        `https://rocky-temple-83495.herokuapp.com/employees/${id}`,
        updatedData
      );
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === id ? { ...employee, ...updatedData } : employee
        )
      );
    } catch (error) {
      console.log("Error updating employee:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://rocky-temple-83495.herokuapp.com/employees/${id}`
      );
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== id)
      );
    } catch (error) {
      console.log("Error deleting employee:", error);
    }
  };

  return (
    <div>
      <h1>Employees</h1>

      {selectedEmployee && (
        <div className="EmployeDatafor">
          <h2>Employee Data for {selectedEmployee.name}</h2>
          <p>Name:{selectedEmployee.name}</p>
          <p>Surname: {selectedEmployee.surname}</p>
          <p>Email:{selectedEmployee.email}</p>
          <p>Position: {selectedEmployee.position}</p>
        </div>
      )}
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
          Surname:
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Position:
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Create Employee</button>
      </form>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            <p>Name: {employee.name}</p>
            <p>Surname: {employee.surname}</p>
            <p>Email: {employee.email}</p>
            <p>Position: {employee.position}</p>
            <button
              onClick={() =>
                handleUpdate(employee.id, {
                  name: "Anun",
                  surname: "Azganun",
                  email: "email@gmail.com",
                })
              }
            >
              Update
            </button>
            <button onClick={() => handleDelete(employee.id)}>Delete</button>
            <button onClick={() => handleShowData(employee)}>Show Data</button>
            <button onClick={() => handleEmployeeClick(employee.id)}>
              Page {employee.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Employees;
