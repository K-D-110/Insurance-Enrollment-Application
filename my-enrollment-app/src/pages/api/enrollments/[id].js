import { enrollments } from "../../db"

export default async function handler(req, res) {
  const { id } = req.query;

  const enrollment = enrollments.find(enrollment => enrollment.id === parseInt(id));
  let enrollmentIndex = enrollments.findIndex(enrollment => enrollment.id === parseInt(id));

  if (!enrollment || enrollmentIndex === -1) {
    return res.status(404).json({ success: false, message: `Enrollment with id ${id} not found` });
    }
    
    switch (req.method) {
      case 'GET':
        res.status(200).json({ success: true, data: enrollment });
            break;
        
      case 'PUT':
        const updatedData = req.body;
        enrollments[enrollmentIndex] = { ...enrollments[enrollmentIndex], ...updatedData };
        res.status(200).json({ success: true, data: enrollments[enrollmentIndex] });
            break;
        
      case 'DELETE':
        const deletedEnrollment = enrollments.splice(enrollmentIndex, 1);  
        res.status(200).json({ success: true, data: deletedEnrollment });
            break;
        
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }

}

