import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { register } from '../services/api';
import '../css/Register.css'

function Register({setIsLoggedIn}) {
  const navigate = useNavigate();
  const [ registerError, setRegisterError ] = useState('');
  const [ formData, setFormData ] = useState({
    username: '',
    password: '',
    fullname: '',
    birthdate: new Date(),
    gender: ''
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await register(formData);
    if (response.success) {
      localStorage.setItem('token', response.token)
      setRegisterError('')
      setIsLoggedIn(true)
      navigate('/');
    } else {
      setRegisterError(response.message)
    }
  }

  return (
    <div className="register-wrapper">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="register-input">
          <div className="row-1">
            <input 
              type="text" 
              placeholder="Username" 
              required 
              name='username'
              value={formData.username}
              onChange={(event) => setFormData({...formData, [event.target.name]:event.target.value })}
            />
            <input 
              type="password" 
              placeholder="Password" 
              required 
              name='password'
              value={formData.password}
              onChange={(event) => setFormData({...formData, [event.target.name]:event.target.value })}
            />
          </div>
          <div className="row-2">
            <input 
              type="text" 
              placeholder='Fullname' 
              name='fullname'
              value={formData.fullname}
              onChange={(event) => setFormData({...formData, [event.target.name]:event.target.value })}
            />
          </div>
          <div className="row-3">
            <div className="col-1">
              <label>
                Birthdate: 
                <input 
                  type="date"  
                  name='birthdate'
                  value={formData.birthdate}
                  onChange={(event) => setFormData({...formData, [event.target.name]:event.target.value })}
                />   
              </label>
            </div>
            <div className="col-2">
              <label>
                <input 
                  type="radio" 
                  name="gender"
                  value='MALE'
                  onChange={(event) => setFormData({...formData, [event.target.name]:event.target.value })}
                /> Male
              </label>
              <label>
                <input 
                  type="radio" 
                  name="gender"
                  value='FEMALE'
                  onChange={(event) => setFormData({...formData, [event.target.name]:event.target.value })}
                /> Female
              </label>
              <label>
                <input 
                  type="radio" 
                  name="gender"
                  value='OTHER'
                  onChange={(event) => setFormData({...formData, [event.target.name]:event.target.value })}
                /> Other
              </label>
            </div>
          </div>
        </div>
        <button type="submit">Register</button>
        <div className="register-link">
          Already have an account? <Link to="/">Login</Link>
        </div>
        <p className='login-error'>{registerError}</p>
      </form>
    </div>
  )
};

export default Register;