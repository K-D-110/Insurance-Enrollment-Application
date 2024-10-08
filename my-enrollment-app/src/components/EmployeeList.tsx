import React from 'react';
import ListComponent from './ListComponent';


const EmployeeList = ({ employees, onEditEmployee, onDeleteEmployee, onCreateEmployee }) => {

  return (
    <ListComponent
      title="Employees"
      items={employees}
      renderItem={(employee) => (
        <div>
          {employee.firstName} {employee.lastName}
        </div>
      )}
      onEdit={onEditEmployee}
      onDelete={onDeleteEmployee}
      onCreate={onCreateEmployee}
    />
  );
};

export default EmployeeList;
