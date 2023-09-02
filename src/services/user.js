import axios from 'axios';
const API_URL = 'http://127.0.0.1:5000';
const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/api/users/login`, {
    username,
    password,
  });
  return response.data;
};

const userService = {
  login,
};

export default userService;
