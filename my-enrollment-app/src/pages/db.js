

import { PLANS } from '../utils/constants';

export let groups = [
  { id: 1, name: 'Uber', plans: [PLANS.DENTAL, PLANS.VISION] },
  { id: 2, name: 'NOYO Corporation', plans: [PLANS.MEDICARE, PLANS.MEDICAID] },
  { id: 3, name: 'LYFT Corporation', plans: [PLANS.DENTAL, PLANS.VISION, PLANS.MEDICARE, PLANS.MEDICAID] },
];

export let employees = [
  { id: 1, firstName: 'John', lastName: 'Doe', groupId: 1 },
  { id: 2, firstName: 'Jane', lastName: 'Smith', groupId: 2 },
  { id: 3, firstName: 'Sarah', lastName: 'Connor', groupId: 3 },
];

export let enrollments = [
  {
    id: 1,
    employeeId: 1, // John's enrollment
    groupId: 1, // Uber
    plan: PLANS.DENTAL, // Dental plan
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  },
  {
    id: 2,
    employeeId: 1, // John also enrolled in Vision
    groupId: 1, // Uber
    plan: PLANS.VISION,
    startDate: '2024-02-01',
    endDate: '2024-12-31',
  },
  {
    id: 3,
    employeeId: 2, // Jane's enrollment
    groupId: 2, // NOYO Corporation
    plan: PLANS.MEDICARE,
    startDate: '2024-03-01',
    endDate: '2025-02-28',
  },
];
