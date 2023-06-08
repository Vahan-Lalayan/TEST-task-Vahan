import React from "react";
import "./App.css";
import Employees from "./page/Employees";
import Tasks from "./page/task";
import EmployeeDetails from "./page/EmployesDetal";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Employee from './page/Employee';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li className="linkcss">
              <Link to="/employees">Employees</Link>
            </li>
            <li className="linkcss">
              <Link to="/tasks">Tasks</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/employees" component={Employees} />
          <Route path="/employeePage/:id" component={EmployeeDetails} />
          <Route path="/tasks" component={Tasks} />
          <Route path="/employeePages/:id" component={Employee} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
