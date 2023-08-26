import axios from 'axios';

const login = async (username, password) => {
  const response = await axios.post('http://127.0.0.1:5000/api/users/login', {
    username,
    password,
  });
  return response.data;
};

const userService = {
  login,
};

export default userService;
