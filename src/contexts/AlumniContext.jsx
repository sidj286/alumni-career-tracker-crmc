import React, { createContext, useContext, useState } from 'react';

const AlumniContext = createContext(undefined);

const mockAlumni = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    department: 'Computer Science',
    graduationYear: 2022,
    currentPosition: 'Software Engineer',
    company: 'TechCorp Inc',
    isInField: true,
    salary: 75000,
    location: 'San Francisco, CA',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    department: 'Business Administration',
    graduationYear: 2021,
    currentPosition: 'Marketing Manager',
    company: 'Marketing Solutions LLC',
    isInField: true,
    salary: 65000,
    location: 'New York, NY',
    updatedAt: '2024-01-14'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    department: 'Engineering',
    graduationYear: 2023,
    currentPosition: 'Civil Engineer',
    company: 'BuildRight Construction',
    isInField: true,
    salary: 68000,
    location: 'Chicago, IL',
    updatedAt: '2024-01-13'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.williams@email.com',
    department: 'Psychology',
    graduationYear: 2020,
    currentPosition: 'Sales Representative',
    company: 'SalesForce Pro',
    isInField: false,
    salary: 55000,
    location: 'Austin, TX',
    updatedAt: '2024-01-12'
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@email.com',
    department: 'Computer Science',
    graduationYear: 2022,
    currentPosition: 'Data Analyst',
    company: 'DataCorp Analytics',
    isInField: true,
    salary: 70000,
    location: 'Seattle, WA',
    updatedAt: '2024-01-11'
  }
];

export function AlumniProvider({ children }) {
  const [alumni, setAlumni] = useState(mockAlumni);

  const addAlumni = (newAlumni) => {
    setAlumni(prev => [...prev, newAlumni]);
  };

  const updateAlumni = (id, updatedData) => {
    setAlumni(prev => prev.map(a => 
      a.id === id ? { ...a, ...updatedData, updatedAt: new Date().toISOString() } : a
    ));
  };

  const deleteAlumni = (id) => {
    setAlumni(prev => prev.filter(a => a.id !== id));
  };

  return (
    <AlumniContext.Provider value={{
      alumni,
      addAlumni,
      updateAlumni,
      deleteAlumni
    }}>
      {children}
    </AlumniContext.Provider>
  );
}

export function useAlumni() {
  const context = useContext(AlumniContext);
  if (context === undefined) {
    throw new Error('useAlumni must be used within an AlumniProvider');
  }
  return context;
}