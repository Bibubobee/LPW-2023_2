import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './App.css';

function App() {
  const [navbarVisible, setNavbarVisible] = useState(false);

  const [logoVisible, setLogoVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setNavbarVisible(true);
    }, 100); // Adjust the delay as needed
     setTimeout(() => {
      setLogoVisible(true);
    }, 500); // Adjust the delay as needed for the logo
  }, []);

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
              <h3 style={{fontFamily: "Cursive"}}>BIBLIOTECA IGUANO</h3>
            </a>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default App;
