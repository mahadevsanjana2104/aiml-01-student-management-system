import api, { getErrorMessage } from "./api";

export const loginUser = async (payload) => {
  try {
    const response = await api.post("/auth/login", payload);
    const message = response.data;

    if (message?.toLowerCase().includes("success")) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({ email: payload.email }));
      return { success: true, message };
    }

    return { success: false, message };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const registerUser = async (payload) => {
  try {
    const response = await api.post("/auth/register", payload);
    return { success: true, message: response.data };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const logoutUser = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("user");
};

export const isAuthenticated = () => localStorage.getItem("isLoggedIn") === "true";
