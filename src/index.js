import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './index.css';
import Admin from './Admin';
import SearchPage from './SearchPage';
import App from './App';
import PaginaLibro from './PaginaLibro';
import Historial from './Historial';
import Login from './Login';
import BiblioBookview from './BiblioBookview';
import reportWebVitals from './reportWebVitals';

const stateEnum = { User: 0, Librarian: 1, Admin: 2 };


function SelectorComponent() {
 	const [curr_state, setCurrState] = useState(() => {
    const storedState = localStorage.getItem('userState');
    return storedState ? parseInt(storedState, 10) : stateEnum.Librarian;
  });

  useEffect(() => {
    localStorage.setItem('userState', curr_state.toString());
  }, [curr_state]);

  const handleSelect = (value) => {
    setCurrState(value);
  };

  let route1, route2, route3, buttonHist;
  const param= "parametros_magicos_para_despues"

  if (curr_state === stateEnum.User) {
    route1 = <Route path="/" element={<SearchPage />} />;
    route2 = <Route path="/Login" element={<Login />} />;
    route3 = <Route path="/PaginaLibro" element={<PaginaLibro />} />;
  } else if (curr_state === stateEnum.Librarian) {
    route1 = <Route path="/" element={<SearchPage />} />;
    route2 = <Route path="/Historial" element={<Historial />} />;
    buttonHist =<div class = "col-2 ">
                    <button type="submit" class="btn btn-success" ><a href={'/Historial#'+param} className="btn btn-success">Historial notificaciones</a></button>
                </div>
    route3 = <Route path="/PaginaLibro" element={<BiblioBookview />} />;
  } else if (curr_state === stateEnum.Admin) {
    route1 = <Route path="/" element={<Admin />} />;
  }

  return (
    <React.StrictMode>
      <div className="bg-light">
        <App />
        <div>
          <h4>Seleccionar Tipo de usuario</h4>
          <button class="btn btn-warning" onClick={() => handleSelect(0)}>Usuario</button>
          <button class="btn btn-warning" onClick={() => handleSelect(1)}>Bibliotecario</button>
          <button class="btn btn-warning" onClick={() => handleSelect(2)}>Admin</button>
        </div>
        {buttonHist}
        <Router>
          <Routes>
            {route1}
            {route2}
            {route3}
            <Route path="*" element={<NotFoundComponent />} />
          </Routes>
        </Router>
      </div>
    </React.StrictMode>
  );
}

function NotFoundComponent() {
  return <h1>Page not found</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<SelectorComponent />);

reportWebVitals();
