import DetalleModal from "./DetalleModal";
import "bootstrap/dist/css/bootstrap.min.css"

function Historial() {
  return (
    <div class="Historial">
      <header class='px-4 my-1'>
        Historial de solicitudes
      </header>
      <main>
        <div class="container">
          <div class="row px-4 my-3 border-bottom">
            <div class="col-3 col-sm-3">
              <p>Nombre</p>
            </div>
            <div class="col-3 col-sm-3">
              <p>Libro</p>
            </div>
            <div class="col-3 col-sm-3">
              <p>Estado</p>
            </div>
            <div class="col-3 col-sm-3">
              <p>Detalles</p>
            </div>
          </div>
          <div class="row px-4 my-2 mt-4 border-bottom">
            <div class="col-3 col-sm-3">
              <p>Juan</p>
            </div>
            <div class="col-3 col-sm-3">
              <p>El Codigo DaVinci</p>
            </div>
            <div class="col-3 col-sm-3 d-flex align-items-center">
              <p>
                <span class="badge bg-primary">Entregado</span>
              </p>
            </div>
            <div class="col-3 col-sm-3 d-flex align-items-center">
              <DetalleModal 
              id="Detalle1"
              nombreUsuario="Juan" 
              nombreLibro="El Codigo DaVinci" 
              fechaPedido="01-01-2023" 
              fechaLimite="08-01-2023" 
              fechaEntrega="07-01-2023" 
              tipoSolicitud="Entrega a domicilio" 
              />
            </div>
          </div>
          <div class="row px-4 my-2 mt-4 border-bottom">
            <div class="col-3 col-sm-3">
              <p>Carlos</p>
            </div>
            <div class="col-3 col-sm-3">
              <p>Manifiesto Comunista</p>
            </div>
            <div class="col-3 col-sm-3 d-flex align-items-center">
              <p>
                <span class="badge bg-warning">En Espera</span>
              </p>
            </div>
            <div class="col-3 col-sm-3 d-flex align-items-center">
              <DetalleModal
              id="Detalle2" 
              nombreUsuario="Carlos" 
              nombreLibro="Manifiesto Comunista" 
              fechaPedido="07-11-2023" 
              fechaLimite="07-12-2023" 
              fechaEntrega="X-X-X" 
              tipoSolicitud="Prestamo" 
              />
            </div>
          </div>
          <div class="row px-4 my-2 mt-4 border-bottom">
            <div class="col-3 col-sm-3">
              <p>Marco</p>
            </div>
            <div class="col-3 col-sm-3">
              <p>Los Versos Satánicos</p>
            </div>
            <div class="col-3 col-sm-3 d-flex align-items-center">
              <p>
                <span class="badge bg-danger">Atrasado</span>
              </p>
            </div>
            <div class="col-3 col-sm-3 d-flex align-items-center">
              <DetalleModal 
              id="Detalle3"
              nombreUsuario="Marco" 
              nombreLibro="Los Versos Satánicos" 
              fechaPedido="01-10-2023" 
              fechaLimite="01-11-2023" 
              fechaEntrega="X-X-X" 
              tipoSolicitud="Prestamo" 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Historial;
