// import packages here
import { Routes, Route, Navigate } from 'react-router-dom';

// import components here
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Todo from './pages/Todo';

// import context
import { useAuthContext } from './context/AuthContext.jsx';

// import others
import './css/App.css'

function App() {
  
  const { isLoggedIn } = useAuthContext();
  
  /**
  * TODO
  * - add authentication for token
  * - move token from localstorage to coockie 
  **/ 

  return (
    <Routes>
  
      {/* Default Route - Redirects to Login when !isLoggedIn */}
      <Route path='/' element={ !isLoggedIn ? 
        ( 
          <Navigate to='/login' /> 
        ) : (
          <ProtectedRoute>
            <Navbar />
            <main className='main-content'>
              <Todo/>
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
