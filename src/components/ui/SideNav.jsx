import React from "react";
import { Link } from "react-router-dom";

const SideNav = ({ items }) => (
  <nav className="layout-nav__lateral">
    <ul className="layout-nav__list">
      {items.map(({ to, label }) => (
        <li className="layout-nav__item" key={to}>
          <Link to={to} className="layout-nav__link">
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default SideNav;
