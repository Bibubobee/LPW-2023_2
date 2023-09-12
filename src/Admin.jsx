// import './Admin.css';

function Admin() {
    return (
        <div class = "container">
            <div class ="row" style = {{margin:"5% auto"}}>
                <table class="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col-md col-sm-1 d-flex justify-content-center">#</th>
                            <th scope="col-md col-sm-2 d-flex justify-content-center">Nombre persona</th>
                            <th scope="col-md col-sm-6 d-flex justify-content-center">Nombre Libro</th>
                            <th scope="col-md col-sm-1 d-flex justify-content-center">Tipo prestamo</th>
                            <th scope="col-md col-sm-2 d-flex justify-content-center">Tiempo restante</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Pepe</td>
                            <td>The communist manifesto</td>
                            <td>Casa</td>
                            <td>2 dias para vencer</td>
                        </tr>
                    </tbody> 
                </table>
            </div>
        </div>
    );
}

export default Admin;
