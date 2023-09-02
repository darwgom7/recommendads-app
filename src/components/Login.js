import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import userService from '../services/user';

const Login = ({ setToken, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      if (username.trim() === '' || password.trim() === '') {
        console.error('Username and password are required.');
        return;
      }

      const response = await userService.login(username, password);
      if (response.access_token) {
        setToken(response.access_token);
        const decodedToken = jwtDecode(response.access_token);
        setUser(decodedToken); 
        localStorage.setItem('authToken', response.access_token);
        localStorage.setItem('authUser', JSON.stringify(decodedToken));
        history.push('/ads');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="button" className="btn btn-primary btn-block mt-3" onClick={handleLogin}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
