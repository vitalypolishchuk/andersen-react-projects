import { useSelector } from "react-redux";
import React from "react";
import { Navigate } from "react-router-dom";
import { AppState } from "../../AppState.types";

interface ProtectedTodosProps {
  children: React.ReactNode;
}

const ProtectedTodos = ({ children }: ProtectedTodosProps) => {
  const name = useSelector(({ name }: AppState) => name);

  if (!name) return <Navigate to="/" />;
  return <>{children}</>;
};

export default ProtectedTodos;
