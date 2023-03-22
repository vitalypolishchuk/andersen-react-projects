import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedTodos = ({ children }) => {
  const name = useSelector(({ name }) => name);

  if (!name) return <Navigate to="/" />;
  return children;
};

export default ProtectedTodos;
