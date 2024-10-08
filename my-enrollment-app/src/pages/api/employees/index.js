import { employees } from "../../db";

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      res.status(200).json({ success: true, data: employees });
          break;
      
    case 'POST':
      const { firstName, lastName, groupId } = req.body;
      if (!firstName || !lastName || !groupId) {
        return res.status(400).json({ success: false, message: "Name, last name and group id are required" });
      }
      const newEmployee = {
          id: Math.random().toString(36).substr(2, 9),
          firstName,
          lastName,
          groupId
      };
      employees.push(newEmployee);
      res.status(201).json({ success: true, data: newEmployee });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    

}

