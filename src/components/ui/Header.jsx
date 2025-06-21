import React, { useState, useRef, useEffect } from "react";
import logoBlanco from "../../assets/logos/logo-blanco.png";
import { Link } from "react-router-dom";
import "../../styles/ui/HeaderFooter.css";

const Header = ({ items }) => (
  <header className="layout-header">
    <div className="layout-header__logo">
      <img src={logoBlanco} alt="Logo" className="layout-header__logo-img" />
    </div>
    <p className="layout-header__title">FORAGEND</p>
    <DropdownMenu items={items} />
  </header>
);

export default Header;

function DropdownMenu({ items }) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const dropRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        {isMobile ? (
          <>
            {items.map(({ to, label }) => (
              <li className="layout-header__dropdown-item" key={to}>
                <Link
                  to={to}
                  className="layout-header__dropdown-item-link"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="layout-header__dropdown-item">
              <Link
                className="layout-header__dropdown-item-link"
                to="/logout"
                onClick={() => setOpen(false)}
              >
                Cerrar sesión
              </Link>
            </li>
          </>
        ) : (
          <li className="layout-header__dropdown-item">
            <Link
              className="layout-header__dropdown-item-link"
              to="/logout"
              onClick={() => setOpen(false)}
            >
              Cerrar sesión
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
