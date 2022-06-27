import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({ children, redirectTo }) {
  const token = localStorage.getItem('userToken');
  if (token) {
    return children;
  }
  return <Navigate to='/' />;
}
