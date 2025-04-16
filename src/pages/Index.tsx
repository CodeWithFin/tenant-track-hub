
import { Navigate } from "react-router-dom";

// Redirect to login page as the main page
const Index = () => {
  return <Navigate to="/login" replace />;
};

export default Index;
