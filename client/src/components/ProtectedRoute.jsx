import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {

  const { isLoggedIn } = useAuthContext();

  return isLoggedIn ? children : <Navigate to="/" />;

};

export default ProtectedRoute;