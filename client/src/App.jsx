import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import AppLayout from '@/layouts/AppLayout';
import HomePage from '@/pages/HomePage';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';

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
            </AppLayout>   
          </ProtectedRoute>
        )
      } />

      {/* Login Route */}
      <Route path="/login" element={<LoginPage/>} />

      {/* Register Route */}
      <Route path="/register" element={<RegisterPage/>} />
  
    </Routes>
  )
}

export default App
