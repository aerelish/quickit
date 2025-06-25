import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { useState } from 'react';
import '../css/Login.css';

function Login({setIsLoggedIn}) {
  const navigate = useNavigate();
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loginError, setLoginError ] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login(username, password);
    if (response.success) {
      localStorage.setItem('token', response.token)
      setLoginError('')
      setIsLoggedIn(true)
      navigate('/');
    } else {
      setLoginError(response.message)
    }
    setUsername('');
    setPassword('');
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="login-input">
          <input 
            type="text" 
            placeholder="Username" 
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)} 
          />
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
        <p className='login-error'>{loginError}</p>
      </form>
    </div>
  );
};

export default Login;
