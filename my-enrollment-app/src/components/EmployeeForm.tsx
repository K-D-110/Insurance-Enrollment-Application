import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ initialData, onSave, groups }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [availablePlans, setAvailablePlans] = useState([]);
  const [id, setId] = useState('');


  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.firstName);
      setLastName(initialData.lastName);
      setSelectedGroup(initialData.groupId);
      setSelectedPlans(initialData.plan);
      setId(initialData.id);
    }
  }, [initialData]);

  // Update available plans when a group is selected
  useEffect(() => {
    if (selectedGroup) {
      const group = groups.find((g) => g.id === parseInt(selectedGroup));
      setAvailablePlans(group ? group.plans : []);
      setSelectedPlans([]); // Reset plan if group changes
    }
  }, [selectedGroup, groups]);


   const handleCheckboxChange = (plan: string) => {
    if (selectedPlans.includes(plan)) {
      setSelectedPlans(selectedPlans.filter((p) => p !== plan));
    } else {
      setSelectedPlans([...selectedPlans, plan]);
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation to ensure a group and plan are selected
    if (!selectedGroup) {
      alert('Please select a group.');
      return;
    }
    if(selectedPlans.length === 0){
      alert('Please select at least one plan.');
      return;
    }
    if(!firstName || !lastName){
      alert('Please enter a first name and last name.');
      return;
    }

    onSave({
      id,
      firstName,
      lastName,
      groupId: selectedGroup,
      plan: selectedPlans,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold">First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Enter first name"
        />
      </div>

      <div>
        <label className="block font-semibold">Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Enter last name"
        />
      </div>

      {/* Group Selection */}
      <div>
        <label className="block font-semibold">Select Group:</label>
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Select a group</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      {/* Plan Selection */}
      <div>
       
        {availablePlans.length > 0 && ( <label className="block font-semibold">Plans:</label>)}
          
        <div className="flex space-x-4">
          {availablePlans.map((plan) => (
            <label key={plan} className="inline-flex items-center">
              <input
                type="checkbox"
                value={plan}
                checked={selectedPlans.includes(plan)}
                onChange={() => handleCheckboxChange(plan)}
                className="mr-2"
              />
              {plan}
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Save Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
