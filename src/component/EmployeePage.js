import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function EmployeePage() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetch(`https://rocky-temple-83495.herokuapp.com/employees/${id}`)
      .then((response) => response.json())
      .then((data) => setEmployee(data));
    }, [id]);

    if (!employee) {
        return <div>Loading...</div>;
    }
    

    return (


    


      
      <div>
    
            <h1>Employee Details</h1>
            <p>Name: {employee.name}</p>
            <p>Surname: {employee.surname}</p>
            <p>Position: {employee.position}</p>
        </div>
    );
}

export default EmployeePage;
