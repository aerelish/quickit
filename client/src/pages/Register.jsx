// packages
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// components
import InputField from '../components/InputField';
import Button from '../components/Button';

// services
import { register } from '../services/authServices';

// context
import { useAuthContext } from '../context/AuthContext';

function Register() {

  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuthContext();
  
  const [ registerError, setRegisterError ] = useState('');
  const [ formData, setFormData ] = useState({
    username: '',
    password: '',
    fullname: '',
    birthdate: new Date(),
    gender: 'MALE'
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await register(formData);
    if (response.success) {
      localStorage.setItem('token', response.data); 
      setIsLoggedIn(true);
      setRegisterError('');
      navigate('/');
    } else {
      setRegisterError(response.error);
    };
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center px-8">
      <form className="border-1 border-zinc-600 rounded-lg p-8 mx-auto max-w-4xl md:w-2xl lg:w-4xl lg:py-20 lg:px-24" onSubmit={handleSubmit}>
        <h1 className='text-3xl pb-4 text-left md:text-5xl'>Register</h1>
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row md:justify-between md:gap-6">
            <InputField
              name='username'
              placeholder="Username"
              required={true}
              value={formData.username}
              onChange={(event) => setFormData({...formData, [event.target.name]:event.target.value })}
            />
            <InputField
              type='password'
              name='password'
              placeholder="Password"
              required={true}
              value={formData.password}
              onChange={(event) => setFormData({...formData, [event.target.name]:event.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <InputField
              name='fullname'
              placeholder="Fullname"
              value={formData.fullname}
              onChange={(event) => setFormData({...formData, [event.target.name]:event.target.value })}
            />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:gap-6">
            <InputField
              label='Birthdate'
              type='date'
              name='birthdate'
              value={formData.birthdate}
              onChange={(event) => setFormData({...formData, [event.target.name]:event.target.value })}
            />
            <div className='my-2 md:w-full'>
              <label htmlFor='gender' className="block text-sm font-medium text-gray-300 mb-1 lg:text-2xl">
                Gender
              </label>
              <select 
                id="gender" 
                name="gender"
                value={formData.gender}
                className="bg-transparent border border-gray-300 text-[var(--white)] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:bg-[var(--white)] focus:text-black block w-full p-2.5"
                onChange={(event) => setFormData({...formData, [event.target.name]:event.target.value })}>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>
        </div>
        <p className='my-2 text-center font-xs text-red-600'>{registerError}</p>
        <Button type="submit">Register</Button>
        <p className="text-center py-1 lg:text-lg">
          Already have an account?
          <span><br/><Link className='font-semibold hover:text-[var(--accent-color)]' to="/">Login</Link></span>
        </p>
      </form>
    </div>
  )
};

export default Register;