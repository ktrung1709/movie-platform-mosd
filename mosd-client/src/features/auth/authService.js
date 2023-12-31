import axios from "axios";
import { base_url } from "../../utils/baseUrl";
// import { config } from "../../utils/axiosConfig";

const register = async (userData) => {
  const res = await axios.post(`${base_url}auth/signup`, userData);
  if (res.data) {
    return res.data;
  }
};

const login = async (userData) => {
  const res = await axios.post(`${base_url}auth/signin`, userData);
  if (res.data) {
    return res.data;
  }
};

const logout = async () => {
  const res = await axios.get(`${base_url}auth/logout`);
  if (res.data) {
    return res.data;
  }
};

export const authService = {
  register,
  login,
  logout,
};
