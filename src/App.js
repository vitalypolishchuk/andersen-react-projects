import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserName from "./components/UserName/UserName";
import ProtectedTodos from "./components/Todos/ProtectedTodos";
import Todos from "./components/Todos/Todos";
import InProcessTodos from "./components/Todos/InProcessTodos/InProcess";
import CompletedTodos from "./components/Todos/CompletedTodos/CompletedTodos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<UserName />} />
        <Route
          path="/todos"
          element={
            <ProtectedTodos>
              <Todos />
            </ProtectedTodos>
          }
        />
        <Route
          path="/todos/inprocess"
          element={
            <ProtectedTodos>
              <InProcessTodos />
            </ProtectedTodos>
          }
        ></Route>
        <Route
          path="/todos/completed"
          element={
            <ProtectedTodos>
              <CompletedTodos />
            </ProtectedTodos>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
