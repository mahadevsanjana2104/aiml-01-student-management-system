import api, { getErrorMessage } from "./api";

export const getAttendance = async () => {
  try {
    const response = await api.get("/attendance");
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const createAttendance = async (attendance) => {
  try {
    const response = await api.post("/attendance", attendance);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const updateAttendance = async (id, attendance) => {
  try {
    const response = await api.put(`/attendance/${id}`, attendance);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const deleteAttendance = async (id) => {
  try {
    await api.delete(`/attendance/${id}`);
    return { success: true };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};
