import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const AuthLayout = ({ children, requireAuth = true, allowedRoles = [] }) => {
  const navigate = useNavigate();
  const { status: isAuthenticated, roles: userRoles } = useSelector((state) => state.auth);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    
    if (requireAuth) {
      // For routes that require authentication
      if (!isAuthenticated && !token) {
        // Not authenticated and no token, redirect to signin
        navigate("/signin");
        return;
      }
      
      // Check role-based access if roles are specified
      if (allowedRoles.length > 0 && isAuthenticated) {
        const hasPermission = userRoles.some(role => allowedRoles.includes(role));
        if (!hasPermission) {
          // User doesn't have the required role
          navigate("/unauthorized");
          return;
        }
      }
    } else {
      // For routes that don't require authentication (like landing pages)
      // No additional checks needed, allow access regardless of auth status
    }
    
    setLoading(false);
  }, [isAuthenticated, userRoles, requireAuth, allowedRoles, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-white bg-[#030712]">
        <div className="loading loading-spinner h-16 w-16 bg-blue-700"></div>
        <div className="mt-4 text-lg">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthLayout;