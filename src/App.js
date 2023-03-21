import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserName from "./components/UserName/UserName";
import Todos from "./components/Todos/Todos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/asdasd" element={<UserName />} />
        <Route index element={<Todos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
