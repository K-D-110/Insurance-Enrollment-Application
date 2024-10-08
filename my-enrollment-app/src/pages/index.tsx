import React, { useState, useEffect } from 'react';
import GroupList from '../components/GroupList';
import EmployeeList from '../components/EmployeeList';
import EnrollmentList from '../components/EnrollmentList';
import Modal from '../components/Modal';
import GroupForm from '../components/GroupForm';
import EmployeeForm from '../components/EmployeeForm';
import EnrollmentForm from '../components/EnrollmentForm';

const IndexPage = () => {
  const [groups, setGroups] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(''); // Could be 'group', 'employee', or 'enrollment'
  console.log("selected", selectedItem)

  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupRes = await fetch('/api/groups');
        const groupData = await groupRes.json();
        const groups = groupData.data;
        setGroups(groups);

        const employeeRes = await fetch('/api/employees');
        const employeeData = await employeeRes.json();
        const employees = employeeData.data;
        setEmployees(employees);

        const enrollmentRes = await fetch('/api/enrollments');
        const enrollmentData = await enrollmentRes.json();
        const enrollments = enrollmentData.data;
        setEnrollments(enrollments);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openModal = (type, item = null) => {
    setSelectedItem(item);
    setModalType(type);
    setIsEditing(!!item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setModalType('');
    setIsEditing(false);
  };

  const handleSaveGroup = async (group) => {
  try {
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `/api/groups/${group.id}` : '/api/groups';
    
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(group),
    });
    
    if (!res.ok) {
      throw new Error('Failed to save group');
    }
    
    const savedGroup = await res.json();
    const updatedGroup = savedGroup.data; 

    if (isEditing) {
      setGroups(groups.map((g) => (g.id === updatedGroup.id ? updatedGroup : g)));
    } else {
      setGroups([...groups, updatedGroup]);
    }


    closeModal();
  } catch (err) {
    console.error(err);  
    alert('Failed to save group');  
  }
 };
  
 const handleDeleteGroup = async (group) => {
  if (window.confirm(`Are you sure you want to delete the group '${group.name}'?`)) {
    try {
      const res = await fetch(`/api/groups/${group.id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Failed to delete group');
      }
      // Filter out the deleted group from the current groups state
      setGroups(groups.filter(g => g.id !== group.id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete group');
    }
  }
};


  const handleEditGroup = async (group) => {
    setSelectedItem(group);
    openModal('group', group);
    setIsEditing(true);
  }

  const handleSaveEmployee = async (employee) => {
    console.log("employee from handleSaveEmployee=", employee);
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `/api/employees/${employee.id}` : '/api/employees';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
      });
      const savedEmployee = await res.json();
      const updatedEmployee = savedEmployee.data;
      if (isEditing) {
        setEmployees(
          employees.map((e) => (e.id === updatedEmployee.id ? updatedEmployee : e))
        );
      } else {
        setEmployees([...employees, updatedEmployee]);
      }

      closeModal();
    } catch (err) {
      setError('Failed to save employee', err);
    }
  };

  const handleDeleteEmployee = async (employee) => {
    if (window.confirm(`Are you sure you want to delete the employee '${employee.firstName} ${employee.lastName}'?`)) {
      try {
        const res = await fetch(`/api/employees/${employee.id}`, { method: 'DELETE' });
        if (!res.ok) {
          throw new Error('Failed to delete employee');
        }
        setEmployees(employees.filter(e => e.id !== employee.id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete employee');
      }
    }
  };

  const handleEditEmployee = async (employee) => {
    setSelectedItem(employee);
    openModal('employee', employee);
    setIsEditing(true);
  }

  const handleDeleteEnrollment = async (enrollment) => {
    if (window.confirm(`Are you sure you want to delete the enrollment for '${enrollment.plan}`)) {
      try {
        const res = await fetch(`/api/enrollments/${enrollment.id}`, { method: 'DELETE' });
        if (!res.ok) {
          throw new Error('Failed to delete enrollment');
        }
        setEnrollments(enrollments.filter(en => en.id !== enrollment.id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete enrollment');
      }
    }
  };

  const handleEditEnrollment = async (enrollment) => {
    setSelectedItem(enrollment);
    openModal('enrollment', enrollment);
    setIsEditing(true);
  }

  const handleSaveEnrollment = async (enrollment) => {
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing
        ? `/api/enrollments/${enrollment.employeeId}`
        : '/api/enrollments';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enrollment),
      });
      const savedEnrollment = await res.json();
      const updatedEnrollment = savedEnrollment.data;

      if (isEditing) {
        setEnrollments(
          enrollments.map((en) =>
            en.id === updatedEnrollment.id ? updatedEnrollment : en
          )
        );
      } else {
        setEnrollments([...enrollments, updatedEnrollment]);
      }

      closeModal();
    } catch (err) {
      setError('Failed to save enrollment');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-5xl font-bold text-center mb-10 text-gray-700 border-gray-300 p-4 rounded-lg">
        Enrollment Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border border-gray-300 rounded-lg bg-gray-50 shadow-md">
          <GroupList
            groups={groups}
            onEditGroup={(selectedItem) => handleEditGroup(selectedItem)}
            onDeleteGroup={(group) => handleDeleteGroup(group)}
            onCreateGroup={() => openModal('group')}
          />
        </div>

        <div className="p-6 border border-gray-300 rounded-lg bg-gray-50 shadow-md">
          <EmployeeList
            employees={employees}
            onEditEmployee={(selectedItem) => handleEditEmployee(selectedItem)}
            onDeleteEmployee={(employee) => handleDeleteEmployee(employee)}
            onCreateEmployee={() => openModal('employee')}
          />
        </div>

        <div className="p-6 border border-gray-300 rounded-lg bg-gray-50 shadow-md">
          <EnrollmentList
            enrollments={enrollments}
            onEditEnrollment={(enrollment) => handleEditEnrollment(enrollment)}
            onDeleteEnrollment={(enrollment) => handleDeleteEnrollment(enrollment)}
            onCreateEnrollment={() => openModal('enrollment')}
            onError={setError}
          
          />
        </div>
      </div>

      {/* Modal for Create/Update Group, Employee, Enrollment */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          isEditing
            ? `Update ${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`
            : `Create ${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`
        }
      >
        {modalType === 'group' && (
          <GroupForm initialData={selectedItem} onSave={(selectedItem) => { handleSaveGroup(selectedItem)}} />
        )}
        {modalType === 'employee' && (
          <EmployeeForm initialData={selectedItem} onSave={(selectedItem) => { handleSaveEmployee(selectedItem)}} groups={groups} />
        )}
        {modalType === 'enrollment' && (
          <EnrollmentForm
            initialData={selectedItem}
            employees={employees}
            groups={groups}
            onSave={handleSaveEnrollment}
          />
        )}
      </Modal>
    </div>
  );
};

export default IndexPage;
