import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Menuvertical from './components/Menuvertical'; // Importa el componente MenuVertical
import Perfilusuario  from './components/Perfilusuario'; // Importa el componente Perfilusuario
import Dashboard from './components/Dashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Menuvertical />} />
        <Route path="/Perfilusuario" element={<Perfilusuario />} />
        <Route path="/Dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}

export default App;

