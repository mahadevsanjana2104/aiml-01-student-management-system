import api, { getErrorMessage } from "./api";

export const getCourses = async () => {
  try {
    const response = await api.get("/courses");
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const createCourse = async (course) => {
  try {
    const response = await api.post("/courses", course);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const updateCourse = async (id, course) => {
  try {
    const response = await api.put(`/courses/${id}`, course);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const deleteCourse = async (id) => {
  try {
    await api.delete(`/courses/${id}`);
    return { success: true };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};
