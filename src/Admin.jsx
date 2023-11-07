import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

function Admin() {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className ="row" style = {{margin:"5% auto"}}>
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col-md col-sm-2 d-flex justify-content-center">ID</th>
                  <th scope="col-md col-sm-2 d-flex justify-content-center">Nombre persona</th>
                  <th scope="col-md col-sm-2 d-flex justify-content-center">Nombre Libro</th>
                  <th scope="col-md col-sm-2 d-flex justify-content-center">Tipo prestamo</th>
                  <th scope="col-md col-sm-2 d-flex justify-content-center">Tiempo restante</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Pepe</td>
                  <td>The communist manifesto</td>
                  <td>Casa</td>
                  <td>2 días para vencer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
