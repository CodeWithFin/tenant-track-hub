
import { Navigate } from "react-router-dom";

// Redirect to dashboard as the main page
const Index = () => {
  return <Navigate to="/dashboard" replace />;
};

export default Index;
