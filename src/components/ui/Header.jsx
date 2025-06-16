import React, { useState, useRef, useEffect } from "react";
import logoBlanco from "../../assets/logos/logo-blanco.png";
import { Link } from "react-router-dom";
import "../../styles/ui/HeaderFooter.css";

const Header = () => {
  return (
    <header className="layout-header">
      <div className="layout-header__logo">
        <img src={logoBlanco} alt="Logo" className="layout-header__logo-img" />
      </div>
      <p className="layout-header__title">FORAGEND</p>
      <DropdownMenu />
    </header>
  );
};

export default Header;

function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const dropRef = useRef(null);

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Obtiene la ruta actual"
  const currentPath = window.location.pathname;

  // Determina el rol desde la ruta actual
  const pathParts = currentPath.split("/").filter(Boolean);
  const role = pathParts[0] || "user"; // fallback a "user" si no hay rol

  // Construye la ruta de perfil según el rol
  const perfilPath = `/${role}/perfil`;

  return (
    <div
      className={`layout-header__dropdown${
        open ? " layout-header__dropdown--open" : ""
      }`}
      ref={dropRef}
    >
      <button
        className="layout-header__dropdown-button"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="Abrir menú"
      >
        Menú
      </button>
      <ul
        className="layout-header__dropdown-menu"
        style={{ display: open ? "block" : "none" }}
      >
        <li>
          <Link
            className="layout-header__dropdown-item"
            to={perfilPath}
            onClick={() => setOpen(false)}
          >
            Perfil
          </Link>
        </li>
        <li>
          <Link
            className="layout-header__dropdown-item"
            to="/logout"
            onClick={() => setOpen(false)}
          >
            Cerrar sesión
          </Link>
        </li>
      </ul>
    </div>
  );
}
