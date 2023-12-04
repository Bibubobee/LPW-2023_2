import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './index.css';
import Admin from './Admin';
import SearchPage from './SearchPage';
import App from './App';
import PaginaLibro from './PaginaLibro';
import PaginaLibroUsuario from './PaginaLibroUsuario';
import Historial from './Historial';
import Login from './Login';
import BiblioBookview from './BiblioBookview';
import reportWebVitals from './reportWebVitals';
import UserManagment from './UserManagment';
import AdminBookview from './AdminBookview'
import AddBook from './AddBook';
import { AuthProvider, useAuth, LOGIN } from './AuthContext';  // Importa el contexto y las acciones
import axios from 'axios';

const stateEnum = { User: "usuario", Librarian: "bibliotecario", Admin: "admin", visit: "visita"};

function SelectorComponent() {
  const [contentVisible, setContentVisible] = useState(false);
  const { state } = useAuth(); 
 	const [curr_state, setCurrState] = useState(() => {
    const storedState = localStorage.getItem('userState');
    return storedState? storedState : stateEnum.visit;
  });

  const GetUsertype = async (userid) => {
    const searchUserProfileQuery = `
      query GetUsuarioPerfiles($idUsuario: ID!) {
        getUsuarioPerfiles(idUsuario: $idUsuario) {
          perfil{
            tipo
          }
        }
      }
    `;
    const searchUserProfileResponse = await axios.post('http://localhost:8080/graphql', {
      query:searchUserProfileQuery,
      variables: {
        idUsuario: userid
      }
    });
    switch (searchUserProfileResponse.data.data.getUsuarioPerfiles[0].perfil.tipo) {
      case stateEnum.User:
        return 'usuario';
      case stateEnum.Librarian:
        return 'bibliotecario';
      case stateEnum.Admin:
        return 'admin';
      default:
        return 'visita';
    }
  }
  useEffect(() => {
    console.log(curr_state)
    if(state.user != null){
      const userType = GetUsertype(state.user.id);
      if (state.isAuthenticated) {
        setCurrState(userType)
      } else {
        setCurrState("visita")
      }
    }
  }, [state ]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setContentVisible(true);
    }, 100); // Adjust the delay as needed
    return () => clearTimeout(timeout);
  });

  useEffect(() => {
    localStorage.setItem('userState', curr_state);
  }, [GetUsertype,curr_state]);

  const handleSelect = (value) => {
    setCurrState(value);
  };

  let route1, route2, route3, route4,SpecialButton1, SpecialButton2;
  const param= "parametros_magicos_para_despues"

  if (curr_state === stateEnum.User) {
    route1 = <Route path="/" element={<SearchPage />} />;
    route2 = <Route path="/Login" element={<Login />} />;
    route3 = <Route path="/PaginaLibro" element={<PaginaLibroUsuario />} />;
  } else if (curr_state === stateEnum.Librarian) {
    route1 = <Route path="/" element={<SearchPage />} />;
    route2 = <Route path="/Historial" element={<Historial />} />;
    route3 = <Route path="/PaginaLibro" element={<BiblioBookview />} />;
	  route4 = <Route path="/AgregarLibro" element={<AddBook />} />;
    SpecialButton1 =  <a href={'/Historial'} className="custom-button btn btn-success">Historial notificaciones</a>
	  SpecialButton2 =  <a href={'/AgregarLibro'} className="custom-button btn btn-success">Agregar Libros</a>
  } else if (curr_state === stateEnum.Admin) {
    route1 = <Route path="/" element={<SearchPage/>} />;
    route2 = <Route path="/Admin" element={<Admin />} />;
    route4 = <Route path="/UserManagment" element={<UserManagment />} />;
    route3 = <Route path="/PaginaLibro" element={<AdminBookview />} />;
    SpecialButton1 =  <a href={'/Admin'} className="custom-button btn btn-success">Historial Peticiones</a>
    SpecialButton2 =  <a href={'/UserManagment'} className="custom-button btn btn-success">Gestionar Usuarios</a>
  } else {
    route1 = <Route path="/" element={<SearchPage />} />;
    route2 = <Route path="/Login" element={<Login />} />;
    route3 = <Route path="/PaginaLibro" element={<PaginaLibro />} />;
  }
/*como se trabaja en codigo ya hecho los nombres no son los adecuados,
admin.js -> pagina de peticiones
*/

  useEffect(() => {
    const fetchUserType = async () => {
      if(state.user != null){
        try {
          const userType = await GetUsertype(state.user.id);
          setCurrState(userType);
          console.log(userType, stateEnum.Admin === userType);
        } catch (error) {
          console.error('Error fetching user type:', error);
        } finally {
          setContentVisible(true);
        }
      }
    };

    if (state.isAuthenticated && state.user!= null) {
      fetchUserType();
    } else {
      setCurrState(stateEnum.visit);
      setContentVisible(true);
    }
  }, [state]);

return (
  <div>
    <App/>
    <div className={`custom-container ${contentVisible ? 'loaded' : ''}`}>
      <div className="container">

        {/*<div className="row">
          <div className="col-md-12">
            <h4 className="mt-3">Seleccionar Tipo de usuario</h4>
            <div className="btn-group mt-2">
              <button className="btn btn-warning" onClick={() => handleSelect("usuario")}>
                Usuario
              </button>
              <button className="btn btn-warning" onClick={() => handleSelect("bibliotecario")}>
                Bibliotecario
              </button>
              <button className="btn btn-warning" onClick={() => handleSelect("admin")}>
                Admin
              </button>
            </div>
          </div>
        </div>
        */}
        <div className="row mt-3">
          <div className="col-6 d-flex justify-content-start">
            {SpecialButton1}
          </div>
          <div className="col-6 d-flex justify-content-end">
            {SpecialButton2}
          </div>
        </div>


        <Router>
          <Routes>
            {route1}
            {route2}
            {route3}
            {route4}
            <Route path="*" element={<NotFoundComponent />} />
          </Routes>
        </Router>
      </div>
    </div>
  </div>
  );
}
function NotFoundComponent() {
  return <h1>Page not found</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <SelectorComponent />
    </AuthProvider>
  </React.StrictMode>
  );

reportWebVitals();
