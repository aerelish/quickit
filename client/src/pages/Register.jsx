import { Link } from 'react-router-dom';
import '../css/Register.css'

const Register = () => {
  return (
    <div className="register-wrapper">
      <form className="register-form">
        <h2>Register</h2>
        <div className="register-input">
          <div className="row-1">
            <input type="text" placeholder="Username" required />
            <input type="password" placeholder="Password" required />
          </div>
          <div className="row-2">
            <input type="text" placeholder='Fullname'/>
          </div>
          <div className="row-3">
            <div className="col-1">
              <label>
                Birthdate: <input type="date" />   
              </label>
            </div>
            <div className="col-2">
              <label>
                <input type="radio" name="gender" value="male" /> Male
              </label>
              <label>
                <input type="radio" name="gender" value="female" /> Female
              </label>
              <label>
                <input type="radio" name="gender" value="other" /> Other
              </label>
            </div>
          </div>
        </div>
        <button type="submit">Register</button>
        <div className="register-link">
          Already have an account? <Link to="/">Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Register