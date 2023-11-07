import React, { useState, useEffect } from 'react';
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
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img
                src="/4 Imagotipo sin fondo.png"
                alt="Your Logo"
                width="100"
                height="100"
                className={`logo-custom ${logoVisible ? 'loaded' : ''}`}
              />
              BIBLIOTECA IGUANO
            </a>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default App;
