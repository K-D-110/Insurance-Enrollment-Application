import { groups } from '../../db';
import { PLANS } from '../../../utils/constants';
// Handle GET and POST requests for groups
export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'GET':
      // Fetch all groups from the database
      res.status(200).json({ success: true, data:groups });
      break;
    case 'POST':
      // Extract data from request body
      const { name, plans } = req.body;

      // Validate if the required data is present
      if (!name || !plans) {
        return res.status(400).json({ success: false, message: "Group name and plans are required" });
      }
      if(plans.length < 0){
        return res.status(400).json({ success: false, message: "At least one plan is required" });
      }
      // normalize the plans array to uppercase
      const validPlans = Object.values(PLANS).map(plan => plan.toUpperCase());
      if (!plans.some(plan => validPlans.includes(plan.toUpperCase()))) {
        return res.status(400).json({ success: false, message: "At least one valid plan must be selected" });
      }
     

      // Simulate creating a new group (in practice, you would store this in a database)
      const newGroup = {
        id: Math.random().toString(36).substr(2, 9), // Generate a random id for the group
        name: name,
        plans: plans,
      };
      groups.push(newGroup);


      // Respond with the newly created group data
      res.status(201).json({ success: true, data: newGroup });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
