import { employees } from "../../db";

export default function handler(req, res) {
  const { id } = req.query;
    const employee = employees.find(employee => employee.id === parseInt(id));
    let employeeIndex = employees.findIndex(employee => employee.id === parseInt(id));

  if (!employee || employeeIndex === -1) {
    return res.status(404).json({ success: false, message: `Employee with id ${id} not found` });
  }

  switch (req.method) {
      case 'GET':
      res.status(200).json({ success: true, data: employee });
      break;

    case 'PUT':
      const updatedData = req.body;
      employees[employeeIndex] = { ...employees[employeeIndex], ...updatedData };
      res.status(200).json({ success: true, data: employees[employeeIndex] });
      break;

      case 'DELETE':
          // Delete the employee with the specific id
        const deletedEmployee = employees.splice(employeeIndex, 1);  
        res.status(200).json({ success: true, data: deletedEmployee });
        break;
      
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break
  }
}
