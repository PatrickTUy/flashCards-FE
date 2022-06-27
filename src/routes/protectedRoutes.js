import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({ children, redirectTo }) {
  console.log('problem')
  const token = localStorage.getItem('userToken');
  if (token) {
    return children;
  }
  return <Navigate to='/' />;
}
