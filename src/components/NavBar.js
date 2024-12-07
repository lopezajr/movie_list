import React from 'react';
import { NavLink } from 'react-router-dom';  // Use NavLink for active links
import { IonIcon } from '@ionic/react';
import { home, heart } from 'ionicons/icons';
import '../styles/NavBar.scss';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-tabs">
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? 'navbar-tab active-tab' : 'navbar-tab'}
        >
          <IonIcon icon={home} />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => isActive ? 'navbar-tab active-tab' : 'navbar-tab'}
        >
          <IonIcon icon={heart} />
          <span>Favorites</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
