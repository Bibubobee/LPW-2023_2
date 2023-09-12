import React from 'react';
import './App.css';

function App() {
  return (
    <div className="SearchPage">
      <header className="SearchPage">
        <nav className="navbar navbar-expand-md navbar-dark custom-navbar"> {/* Apply the custom-navbar class */}
          <div className="container-fluid">
            {/* Logo */}
            <a className="navbar-brand" href="/">
              <img
                src="/4 Imagotipo sin fondo.png"
                alt="Your Logo"
                width="100"
                height="100" // Adjust width and height as needed
              />
              BIBLIOTECA IGUANO
            </a>

            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default App;
