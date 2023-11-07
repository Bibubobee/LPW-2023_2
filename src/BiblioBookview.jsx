import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import "./BiblioBookview.css"
function BiblioBookview() {
  const [openSinopsis, setOpenSinopsis] = useState(false);
  const [openDetalle, setOpenDetalle] = useState(false);
    return (
        <div className="container">
          <div className="row px-4 my-5">
            <div className="col-sm-7">
              <img src="https://imagessl8.casadellibro.com/a/l/t7/28/9788408175728.jpg" 
                className="img-fluid rounded" 
                alt="Book Cover" 
                width={350}  
              />
            </div>
            <div className="col-sm-5">
            <h1 className="fw-light">El Codigo Da Vinci</h1>
              <div onClick={() => setOpenSinopsis(!openSinopsis)} aria-controls="example-collapse-text" aria-expanded={openSinopsis} className="my-3" style={{cursor: 'pointer', borderTop: '1px solid #000', borderBottom: '1px solid #000', padding: '10px 0'}}>
                <div className="row align-items-center">
                  <div className="col-10 col-sm-11">
                    <p style={{fontWeight: 'bold', marginBottom: '0'}}>Sinopsis:</p>
                  </div>
                  <div className="col-2 col-sm-1">
                    <FaAngleDown />
                  </div>
                </div>
                {openSinopsis && 
                  <div id="example-collapse-text">
                    Robert Langdon recibe una llamada en mitad de la noche:
                    el conservador del museo del Louvre ha sido asesinado en extrañas circunstancias y junto a
                    su cadáver ha aparecido un desconcertante mensaje cifrado. Al profundizar en la investigación,
                    Langdon, experto en simbología, descubre que las pistas conducen a las obras de Leonardo Da Vinci…
                    y que están a la vista de todos, ocultas por el ingenio del pintor.
                  </div>
                }
              </div>
              <div onClick={() => setOpenDetalle(!openDetalle)} aria-controls="example-collapse-text" aria-expanded={openDetalle} className="my-3" style={{cursor: 'pointer', borderBottom: '1px solid #000', padding: '10px 0'}}>
                <div className="row align-items-center">
                  <div className="col-10 col-sm-11">
                    <p style={{fontWeight: 'bold', marginBottom: '0'}}>Detalle</p>
                  </div>
                  <div className="col-2 col-sm-1">
                    <FaAngleDown />
                  </div>
                </div>
                {openDetalle && 
                  <div id="example-collapse-text">
                    <p className="my-3">
                      Fecha de Publicación: 29-08-2017
                    </p>
                    <p className="my-3">
                      Autor: Dan Brown
                    </p>
                  </div>
                }
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#BookEdit">
                  Editar Información
                </button>
              </div>
            </div>
          </div>

          <div className="modal fade" tabIndex="-1" id = "BookEdit">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Editar Información del Libro</h5>
                  <button
                    type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Título</label>
                      <input type="text" className="form-control"/>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Sinopsis</label>
                      <input type="text" className="form-control"/>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Fecha Publicación</label>
                      <input type="text" className="form-control"/>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Autor</label>
                      <input type="text" className="form-control"/>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Cerrar
                  </button>
                  <button type="button" className="btn btn-primary">
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}

export default BiblioBookview;