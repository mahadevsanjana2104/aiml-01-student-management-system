import api, { getErrorMessage } from "./api";

export const getMarks = async () => {
  try {
    const response = await api.get("/marks");
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const createMarks = async (marks) => {
  try {
    const response = await api.post("/marks", marks);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const updateMarks = async (id, marks) => {
  try {
    const response = await api.put(`/marks/${id}`, marks);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const deleteMarks = async (id) => {
  try {
    await api.delete(`/marks/${id}`);
    return { success: true };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};
