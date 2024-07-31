import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const createStudent = async (student) => {
  try {
    const response = await api.post('/students', student);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStudents = async () => {
  try {
    const response = await api.get('/students');
    return response.data.students;
  } catch (error) {
    throw error;
  }
};

export const updateStudent = async (id, updatedStudent) => {
  try {
    const response = await api.put(`/students/${id}`, updatedStudent);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchStudent = async (id, updatedFields) => {
  try {
    const response = await api.patch(`/students/${id}`, updatedFields);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    await api.delete(`/students/${id}`);
  } catch (error) {
    throw error;
  }
};
