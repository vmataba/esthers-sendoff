import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../services/auth.service';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  
  // If the user is not authenticated, redirect to login page
  if (!isAuthenticated()) {
    // Pass the current path as redirectTo parameter
    return (
      <Navigate 
        to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`} 
        replace 
      />
    );
  }

  // If the user is authenticated, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
