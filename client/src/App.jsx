import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Navbar from './components/Navbar';
import Todo from './pages/Todo';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';

import './css/App.css'

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => { 
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true)
    } 
  }, []);

  return (
    <>
      { !isLoggedIn ? (
        <>
          <Routes>
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        </>
      ) : (
        <>
          <Navbar/>
          <main className='main-content'>
            <Routes>
              <Route path="/" element={<Todo />}/>
              {/* <Route path="/water" element={<Water/>}/> */}            
              <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
            </Routes>
          </main>
        </>
      )}
    </>
  )
}

export default App
