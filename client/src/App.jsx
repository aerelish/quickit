// import packages here
import { Routes, Route, Navigate } from 'react-router-dom';

// import components here
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import ActionSelect from './components/ActionSelect.jsx';
import Todos from './components/sections/Todos.jsx';
import Notes from './components/sections/Notes.jsx';

// import context
import { useAuthContext } from './context/AuthContext.jsx';

function App() {
  
  const { isLoggedIn } = useAuthContext();
  
  /**
  * TODO
  * - move token from localstorage to cookie 
  **/ 

  return (
    <Routes>
  
      {/* Default Route - Redirects to Login when !isLoggedIn */}
      <Route path='/' element={ !isLoggedIn ? 
        ( 
          <Navigate to='/login' /> 
        ) : (
          <ProtectedRoute>
            <Navbar/>
            <main className='w-screen h-screen'>
              <div className='w-full bg-[var(--white)] text-[var(--black)]'>
                <Hero/>
              </div>
              <div className='w-full pt-4 px-2 md:px-8 lg:px-24'>
                <ActionSelect/>
                <div className='max-w-7xl mx-auto flex flex-col'>
                  <Todos/>
                  <Notes/>
                </div>
              </div>
            </main>   
          </ProtectedRoute>
        )
      } />

      {/* Login Route */}
      <Route path="/login" element={<Login/>} />

      {/* Register Route */}
      <Route path="/register" element={<Register/>} />
  
    </Routes>
  )
}

export default App
