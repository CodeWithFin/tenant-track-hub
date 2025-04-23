
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// Redirects any visits to /login to /auth for legacy support
const Login = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    } else if (!loading) {
      navigate("/auth", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  return null;
};

export default Login;
