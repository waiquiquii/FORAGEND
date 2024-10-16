import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Menuvertical from './components/Menuvertical'; // Importa el componente MenuVertical
import Perfilusuario  from './components/Perfilusuario'; // Importa el componente Perfilusuario

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Menuveritcal" element={<Menuvertical />} />
        <Route path="/" element={<Perfilusuario />} />
      </Routes>
    </Router>
  );
}

export default App;