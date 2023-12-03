
import {useState} from 'react';
import axios from 'axios';
import { useAuth, LOGIN } from './AuthContext';

import "./Login.css"

function Login(){

    const { dispatch } = useAuth();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [authMessage, setAuthMessage] = useState('');

    const handleLogin = async () => {
        try {
            const auth = `
              mutation myMutation($input: AutenticacionInput) {
                autenticarUsuario(input: $input) {
                  success
                  token
                  message
                  usuario{
                    id
                  }
                }
              }
            `;
            const authResponse = await axios.post('http://localhost:8080/graphql', {
                query: auth,
                variables: {
                  "input": {
                    "pass": password,
                    "email": user
                  }
                }
            });
            console.log(authResponse)
            if (authResponse.data.data.autenticarUsuario.success) {
                dispatch({
                    type: LOGIN,
                    payload: {
                        user: authResponse.data.data.autenticarUsuario.usuario,
                        token: authResponse.data.data.autenticarUsuario.token,
                    },
                });
                localStorage.setItem('authState', JSON.stringify({
                    user: authResponse.data.data.autenticarUsuario.usuario,
                    token: authResponse.data.data.autenticarUsuario.token,
                }));

                setAuthMessage(`Sesion iniciada con exito`);
                window.location.href = '/'
            } else {
                setAuthMessage(`Error al intentar iniciar sesion: ${authResponse.data.data.autenticarUsuario.message}`);
            }
        }catch (error) {
            setAuthMessage(`Error al intentar iniciar sesion: ${error.message}`);
}


    };
    const handleUserChange = (event) => {
        setUser(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    return(
        <div className="myLogin color-overlay d-flex justify-content-center align-items-center">
            <form className="rounded p-4 p-sm-3" action="/"> {/*method = post*/}
            <h1>Inicie Sesión</h1>
            <p class="description">
                Coloque su correo y contraseña de la biblioteca para hacer el pedido.
            </p>
            <div className="form-group mb-2">
                <label for="username">Correo:</label>
                <input
                type="text"
                class="form-control username"
                id="username"
                placeholder="Correo Electronico"
                name="username"
                value={user}
                onChange={handleUserChange}
                />
            </div>
            <div class="form-group">
                <label for="password">Contraseña:</label>
                <input
                type="password"
                class="form-control password"
                id="password"
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                />
            </div>

            {/*<button type="submit" class="btn btn-primary btn-customized mt-4">*/}
            <button type="button" className="custom-button btn btn-primary btn-customized mt-4" onClick={handleLogin}>
              Ingresar
            </button>
            {authMessage && <p className="auth-message">{authMessage}</p>}
            </form>
        </div>
    )
}

export default Login;