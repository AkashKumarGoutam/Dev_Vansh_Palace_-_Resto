import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    Axios.defaults.withCredentials = true;
    Axios.get("http://localhost:3001/auth/verify_user")
      .then(res => {
        if (res.data.status) {
          setIsAuthenticated(true);
        } else {
          navigate('/');
        }
      })
      .catch(() => {
        navigate('/');
      });
  }, [navigate]);

  return isAuthenticated ? children : null; // Render children if authenticated
};

export default ProtectedRoutes;