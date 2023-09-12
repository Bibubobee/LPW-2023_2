import "./Login.css"

function Login(){
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
                />
            </div>

            {/*<button type="submit" class="btn btn-primary btn-customized mt-4">*/}
            <button href="/" class="btn btn-primary btn-customized mt-4">
                Pedir Libro
            </button>
            </form>
        </div>
    )
}

export default Login;