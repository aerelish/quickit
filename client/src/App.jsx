import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import AppLayout from '@/components/layouts/AppLayout';
import HomePage from '@/pages/HomePage';
import ProtectedRoute from '@/components/ProtectedRoute';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

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
            <AppLayout>
              <HomePage/>
              {/* <div className='w-full bg-[var(--white)] text-[var(--black)]'>
                <SectionWrapper>
                  <Hero/>
                </SectionWrapper>
              </div>
              <div className='w-full'>
                <SectionWrapper>
                  <ActionSelect/>
                  <div className='flex flex-col justify-center align-baseline lg:flex-row lg:gap-8'>
                    <div className='flex-1'>
                      <Todos/>
                    </div>
                    <div className='flex-1'>
                      <Notes/>
                    </div>
                  </div>
                </SectionWrapper>
              </div> */}
            </AppLayout>   
          </ProtectedRoute>
        )
      } />

      {/* Login Route */}
      <Route 
        path="/login" 
        element={
          <Login/>
        } 
      />

      {/* Register Route */}
      <Route path="/register" element={<Register/>} />
  
    </Routes>
  )
}

export default App
