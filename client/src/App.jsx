// import packages here
import { Routes, Route, Navigate } from 'react-router-dom';

// import components here
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import ActionSelect from './components/ActionSelect';
import Todos from './components/sections/Todos';
import Notes from './components/sections/Notes';
import SectionWrapper from './components/SectionWrapper';

// import context
import { useAuthContext } from './context/AuthContext';

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
                <SectionWrapper>
                  <Hero/>
                </SectionWrapper>
              </div>
              <div className='w-full'>
                <SectionWrapper>
                  <ActionSelect/>
                  <div className='flex flex-col'>
                    <Todos/>
                    <Notes/>
                  </div>
                </SectionWrapper>
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
