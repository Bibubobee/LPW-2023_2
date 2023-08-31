import "./Login.css"

function Login(){
    return(
        <div class="container">
            <div class="row">
                <div class="mx-auto col-10 col-md-8 col-lg-6">
                    <form class="form-example" action="" method="post">
                    <h1>Inicie Sesión</h1>
                    <p class="description">
                        Coloque su correo y contraseña de la biblioteca para hacer el pedido.
                    </p>
                    <div class="form-group">
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
        
                    <button type="submit" class="btn btn-primary btn-customized mt-4">
                        Pedir Libro
                    </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;