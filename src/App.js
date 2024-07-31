import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import { getStudents, deleteStudent, updateStudent } from './services/api';

function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          console.error('Data is not an array:', data);
          setStudents([]);
        }
      } catch (error) {
        setError('Failed to fetch students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleStudentCreated = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const handleStudentUpdated = async (updatedStudent) => {
    try {
      const data = await updateStudent(updatedStudent.id, updatedStudent);
      console.log('Updated student data:', data); // Verifica la respuesta
      setStudents(students.map(student => (student.id === data.id ? data : student)));
      setSelectedStudent(null);
    } catch (error) {
      setError('Failed to update student');
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      setError('Failed to delete student');
    }
  };

  return (
    <div className="App">
      <StudentForm
        selectedStudent={selectedStudent}
        onStudentCreated={handleStudentCreated}
        onStudentUpdated={handleStudentUpdated}
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <StudentList
          students={students}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
