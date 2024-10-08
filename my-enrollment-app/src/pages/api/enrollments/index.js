import { enrollments } from "../../db";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'GET':
      res.status(200).json({ success: true, data: enrollments });
          break;
    
      case 'POST':
          
          const { employeeId, plan, startDate, endDate } = req.body; 
          if (!employeeId || !plan || !startDate || !endDate) {
            return res.status(400).json({ success: false, message: "All fields are required" });
          }
          const newEnrollment = {
            id: Math.random().toString(36).substr(2, 9),
            employeeId,
            plan,
            startDate,
            endDate
          };
      enrollments.push(newEnrollment);

          res.status(201).json({ success: true, data: newEnrollment });
        break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}