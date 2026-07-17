import api, { getErrorMessage } from "./api";

export const getStudents = async () => {
  try {
    const response = await api.get("/students");
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const createStudent = async (student) => {
  try {
    const response = await api.post("/students", student);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const updateStudent = async (id, student) => {
  try {
    const response = await api.put(`/students/${id}`, student);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const deleteStudent = async (id) => {
  try {
    await api.delete(`/students/${id}`);
    return { success: true };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const enrollStudent = async (studentId, courseId) => {
  try {
    const response = await api.post(`/students/${studentId}/enroll/${courseId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};
