import React, { useState, useEffect } from 'react';

const EnrollmentForm = ({ initialData, employees, groups, onSave }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [availablePlans, setAvailablePlans] = useState([]); // Always initialize as an array
  const [plan, setPlan] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [today] = useState(() => new Date().toISOString().split('T')[0]); // Get today's date

  useEffect(() => {
    if (initialData) {
      setEmployeeId(initialData.employeeId);
      setPlan(initialData.plan);
      setStartDate(initialData.startDate);
      setEndDate(initialData.endDate);
    }
  }, [initialData]);

  // Update available plans when an employee is selected
  useEffect(() => {
    if (employeeId) {
      const employee = employees.find((emp) => emp.id === parseInt(employeeId));
      if (employee) {
        // Find the group by employee's groupId
        const group = groups.find((g) => g.id === employee.groupId);
        setAvailablePlans(group ? group.plans : []);
      } else {
        setAvailablePlans([]);
      }
      setPlan(''); // Reset plan if employee changes
    } else {
      setAvailablePlans([]); // Reset plans if no employee is selected
    }
  }, [employeeId, employees, groups]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("employeeId from handleSubmit=", employeeId);

    // Validation
    if (!employeeId) {
      alert('Please select an employee.');
      return;
    }
    if (!plan) {
      alert('Please select a plan.');
      return;
    }
    if (startDate < today) {
      alert('Start date cannot be in the past.');
      return;
    }
    if (endDate < startDate) {
      alert('End date cannot be before start date.');
      return;
    }

    onSave({ employeeId, plan, startDate, endDate });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Employee Selection */}
      <div>
        <label className="block font-semibold">Employee:</label>
        <select
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Select employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.firstName} {employee.lastName}
            </option>
          ))}
        </select>
      </div>

      {/* Plan Selection */}
      <div>
        <label className="block font-semibold">Plan:</label>
        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          className="border p-2 rounded w-full"
          disabled={availablePlans.length === 0} // Disable if no plans are available
        >
          <option value="">Select a plan</option>
          {availablePlans.map((plan, index) => (
            <option key={index} value={plan}>
              {plan}
            </option>
          ))}
        </select>
      </div>

      {/* Start Date */}
      <div>
        <label className="block font-semibold">Start Date:</label>
        <input
          type="date"
          value={startDate}
          min={today} // Set minimum value to today's date
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* End Date */}
      <div>
        <label className="block font-semibold">End Date:</label>
        <input
          type="date"
          value={endDate}
          min={startDate} // Set minimum value to start date
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Save Enrollment
      </button>
    </form>
  );
};

export default EnrollmentForm;
