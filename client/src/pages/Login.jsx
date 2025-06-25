import { Link } from 'react-router-dom';
import '../css/Login.css';

const Login = () => {
  return (
    <div className="login-wrapper">
      <form className="login-form">
        <h2>Login</h2>
        <div className="login-input">
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
