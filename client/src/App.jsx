import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/Navbar';
import Todo from './pages/Todo';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';

import './css/App.css'

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      { !isLoggedIn ? (
        <>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </>
      ) : (
        <>
          <Navbar/>
          <main className='main-content'>
            <Routes>
              <Route path="/" element={<Todo />}/>
              {/* <Route path="/water" element={<Water/>}/> */}
            </Routes>
          </main>
        </>
      )}
    </>
  )
}

export default App
