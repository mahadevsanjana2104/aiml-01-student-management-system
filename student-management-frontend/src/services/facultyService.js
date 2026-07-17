import api, { getErrorMessage } from "./api";

export const getFaculty = async () => {
  try {
    const response = await api.get("/faculty");
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const createFaculty = async (faculty) => {
  try {
    const response = await api.post("/faculty", faculty);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const updateFaculty = async (id, faculty) => {
  try {
    const response = await api.put(`/faculty/${id}`, faculty);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const deleteFaculty = async (id) => {
  try {
    await api.delete(`/faculty/${id}`);
    return { success: true };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};
