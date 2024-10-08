import React, { useState, useEffect } from 'react';

const plansOptions = ['Medical', 'Dental', 'Vision', 'Medicare', 'Medicaid']; // TODO: get this from backend

interface GroupFormProps {
  onSave: (group: { name: string; plans: string[] }) => void;
}

const GroupForm: React.FC<GroupFormProps> = ({ initialData, onSave }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);


  // Populate the form when `initialData` is available (e.g., in edit mode)
  useEffect(() => {
    if (initialData) {
      setGroupName(initialData.name || '');
      setSelectedPlans(initialData.plans || []);
    }
  }, [initialData]);

  const handleCheckboxChange = (plan: string) => {
    if (selectedPlans.includes(plan)) {
      setSelectedPlans(selectedPlans.filter((p) => p !== plan));
    } else {
      setSelectedPlans([...selectedPlans, plan]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName) return alert('Group name is required');
    if (selectedPlans.length === 0) return alert('At least one plan is required');
   
    onSave({ id: initialData?.id, name: groupName, plans: selectedPlans });
    setGroupName('');
    setSelectedPlans([]); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold">Group Name:</label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Enter group name"
        />
      </div>

      <div>
        <label className="block font-semibold">Plans:</label>
        <div className="flex space-x-4">
          {plansOptions.map((plan) => (
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

      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        {initialData ? 'Update Group' : 'Create Group'}
      </button>
    </form>
  );
};

export default GroupForm;

