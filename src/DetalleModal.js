import React from 'react';

function DetalleModal({ id, nombreUsuario, nombreLibro, fechaPedido, fechaLimite, fechaEntrega, tipoSolicitud }) {
  return (
    <div class="d-flex" >
      <button class="btn btn-secondary" type="button" data-bs-toggle="modal" data-bs-target={"#"+id} >
        Ver detalles
      </button>
      <div class="modal fade" tabIndex="-1" id = {id}>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Información de Entrega</h5>
              <button
                type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <p><strong>Nombre Usuario:</strong> {nombreUsuario}</p>
              <p><strong>Nombre Libro:</strong> {nombreLibro}</p>
              <p><strong>Fecha de pedido:</strong> {fechaPedido}</p>
              <p><strong>Fecha límite:</strong> {fechaLimite}</p>
              <p><strong>Fecha de entrega:</strong> {fechaEntrega}</p>
              <p><strong>Tipo de Solicitud:</strong> {tipoSolicitud}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleModal;
