// packages
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import { useAuthContext } from '@/context/AuthContext';
import { login } from '@/services/authServices';
import InputField from '@/components/InputField';
import Button from '@/components/Button';

function LoginPage() {

  const navigate = useNavigate();
  const { setUser } = useAppContext()
  const { setIsLoggedIn, setIsTokenValid } = useAuthContext()

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loginError, setLoginError ] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login(username, password);
    if (response.success) {
      localStorage.setItem('token', response.data);      
      setIsLoggedIn(true);
      setIsTokenValid(true);
      setLoginError('');
      setUser(username)
      navigate('/');
    } else {
      setLoginError(response.error)
    }
    setUsername('');
    setPassword('');
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center px-8">
      <form className="border-1 border-zinc-600 rounded-lg p-8 mx-auto max-w-lg lg:w-lg lg:py-20 lg:px-24" onSubmit={handleSubmit}>
        <h1 className='text-3xl pb-4 text-center md:text-5xl'>Login</h1>
        <div className="flex flex-col gap-2">
          <InputField
            placeholder="Username"
            required={true}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            required={true}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <p className='my-2 text-center font-xs text-red-600'>{loginError}</p>
        <Button type="submit">Login</Button>
        <p className="text-center py-1 lg:text-lg">
          Don't have an account? 
          <span><br/><Link className='font-semibold hover:text-[var(--accent-color)]' to="/register">Register</Link></span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
