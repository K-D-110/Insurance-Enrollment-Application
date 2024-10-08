import React from 'react';
import ListComponent from './ListComponent';

const formatDate = (dateString, onError) => {
  try {

    // Check if the dateString is valid
    if (!dateString) {
      throw new Error('Date is undefined or null');
    }

    const date = new Date(dateString);
    
    // Check if the created date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  } catch (error) {
    console.error("Error formatting date:", error.message);
    // Trigger the onError function to show an alert or log error
    if (onError) {
      onError(error);
    }
    return "Invalid date"; // Fallback if date is invalid
  }
};

const EnrollmentList = ({ enrollments, onEditEnrollment, onDeleteEnrollment, onCreateEnrollment, onError }) => {
  return (
    <ListComponent
      title="Enrollments"
      items={enrollments}
      renderItem={(enrollment) => (
        <div className="space-y-1">
          <div className="text-lg font-semibold">Plan: {enrollment.plan}</div>
          <div className="text-sm text-gray-600">
            From: <span className="font-medium">{formatDate(enrollment.startDate, onError)}</span>
          </div>
          <div className="text-sm text-gray-600">
            To: <span className="font-medium">{formatDate(enrollment.endDate, onError)}</span>
          </div>
        </div>
      )}
      onEdit={onEditEnrollment}
      onDelete={onDeleteEnrollment}
      onCreate={onCreateEnrollment}
    />
  );
};


export default EnrollmentList;
