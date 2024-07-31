import React, { useState, useEffect } from 'react';
import { createStudent, updateStudent } from '../services/api';

const StudentForm = ({ selectedStudent, onStudentCreated, onStudentUpdated }) => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    phone: '',
    language: ''
  });

  useEffect(() => {
    if (selectedStudent) {
      setStudent(selectedStudent);
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedStudent) {
      await onStudentUpdated(student);
    } else {
      const newStudent = await createStudent(student);
      onStudentCreated(newStudent);
    }
    setStudent({ name: '', email: '', phone: '', language: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={student.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={student.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="phone"
        value={student.phone}
        onChange={handleChange}
        placeholder="Phone"
      />
      <input
        type="text"
        name="language"
        value={student.language}
        onChange={handleChange}
        placeholder="Language"
      />
      <button type="submit">
        {selectedStudent ? 'Update Student' : 'Add Student'}
      </button>
    </form>
  );
};

export default StudentForm;
