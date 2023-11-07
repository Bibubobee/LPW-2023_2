// import './Admin.css';

function UserManagment() {
    return (
        <div class = "container">
            <div className="row mt-3">
                <div className="col-md-4">
                    <button className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#AddUser">
                        Agregar Usuario
                    </button>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4 d-flex justify-content-end">
                    <button className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#DelUser">
                        Eliminar Usuario
                    </button>
                </div>
            </div>
            <div class ="row" style = {{margin:"5% auto"}}>
                <table class="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col-md col-sm-1 d-flex justify-content-center">#</th>
                            <th scope="col-md col-sm-2 d-flex justify-content-center">Nombre persona</th>
                            <th scope="col-md col-sm-6 d-flex justify-content-center">Correo Electronico</th>
                            <th scope="col-md col-sm-1 d-flex justify-content-center">Rut</th>
                            <th scope="col-md col-sm-2 d-flex justify-content-center">Telefono</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Pepe</td>
                            <td>pepe@uncorreoreal.com</td>
                            <td>12345678-9</td>
                            <td>+569 12345678</td>
                        </tr>
                    </tbody> 
                </table>
            </div>
          <div className="modal fade" tabIndex="-1" id = "AddUser">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Añadir usuario</h5>
                  <button
                    type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Nombre persona</label>
                      <input type="text" className="form-control"/>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Correo Electronico</label>
                      <input type="text" className="form-control"/>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Rut</label>
                      <input type="text" className="form-control"/>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Telefono</label>
                      <input type="text" className="form-control"/>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Cerrar
                  </button>
                  <button type="button" className="btn btn-primary">
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" tabIndex="-1" id = "DelUser">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Eliminar usuario</h5>
                  <button
                    type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Id Usuario</label>
                      <input type="text" className="form-control"/>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Cerrar
                  </button>
                  <button type="button" className="btn btn-primary">
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>    
    );
}

export default UserManagment;
