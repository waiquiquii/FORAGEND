import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Perfilusuario from "./components/pages/Perfilusuario";
import Agendar from "./components/pages/Agendar";
import Inicio from "./components/pages/Inicio";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Perfilusuario" element={<Perfilusuario />} />
        <Route path="/agendar" element={<Agendar />} />
      </Routes>
    </Router>
  );
}

export default App;
