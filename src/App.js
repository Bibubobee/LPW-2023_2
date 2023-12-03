import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from './AuthContext';
import './App.css';

function App() {
  const { state, dispatch } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setNavbarVisible(true);
    }, 100); // Ajusta el retardo según sea necesario
    setTimeout(() => {
      setLogoVisible(true);
    }, 500); // Ajusta el retardo según sea necesario para el logo
  }, []);

  useEffect(() => {
    setIsLoggedIn(state.isAuthenticated);
  }, [state]);

  const handleLogin = () => {
    if (isLoggedIn && state.user  != null) {
      dispatch({ type: 'LOGOUT' });
      window.location.href = '/';
    } else {
      window.location.href = '/Login';
    }
  };

  return (
    <div className="SearchPage">
      <header className="SearchPage">
        <nav className={`navbar navbar-expand-md navbar-dark custom-navbar ${navbarVisible ? 'loaded' : ''}`}>
          <div className="container d-flex justify-content-between align-items-center">
            <a className="navbar-brand d-flex justify-content-between align-items-center" href="/" title='Ir a la página principal'>
              <img
                src="/4 Imagotipo sin fondo.png"
                alt="Your Logo"
                width="100"
                height="100"
                className={`logo-custom ${logoVisible ? 'loaded' : ''}`}
              />
              <h3 style={{ fontFamily: "Cursive" }}>BIBLIOTECA IGUANO</h3>
            </a>
            <button type="button" className="custom-button btn btn-primary" onClick={handleLogin}>
              {isLoggedIn && state.user != null? 'Logout' : 'Login'}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default App;
