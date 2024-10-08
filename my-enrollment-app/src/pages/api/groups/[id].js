import { groups } from "../../db";

export default async function handler(req, res) {
  const {
    query: { id }, // Access the dynamic id from the URL
    method,
  } = req;

  // Find the index of the group by id in the array
  const groupIndex = groups.findIndex(group => group.id === parseInt(id));

  switch (method) {
    case 'GET':
     
      if (groupIndex > -1) {
        // Fetch the group with the specific id
        res.status(200).json({ success: true, data: groups[groupIndex] });
      } else {
        // Group not found
        res.status(404).json({ success: false, message: `Group with id ${id} not found` });
      }
      break;

    case 'PUT':
      // I can add additional validation here including checking if the group name is already taken 
      // do not allow additional key and value pairs to be added
      if (groupIndex > -1) {
        // Update the group with the specific id
        const updatedData = req.body;
        groups[groupIndex] = { ...groups[groupIndex], ...updatedData };

        res.status(200).json({ success: true, data: groups[groupIndex] });
      } else {
        // Group not found
        res.status(404).json({ success: false, message: `Group with id ${id} not found` });
      }
      break;

    case 'DELETE':
      if (groupIndex > -1) {
        // Delete the group with the specific id
        const deletedGroup = groups.splice(groupIndex, 1);

        res.status(200).json({ success: true, data: `Group with id ${id} deleted`, deletedGroup });
      } else {
        // Group not found
        res.status(404).json({ success: false, message: `Group with id ${id} not found` });
      }
      break;

    default:
      // Handle method not allowed
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
