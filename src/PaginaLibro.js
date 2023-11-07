import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import './PaginaLibro.css';

function PaginaLibro() {
  const [openSinopsis, setOpenSinopsis] = useState(false);
  const [openDetalle, setOpenDetalle] = useState(false);
  const param = "#super parametro para ver que lo devuelva a la pagina del libro";

  return (
    <div className="PaginaLibro">
      <main>
        <div className="container">
          <div className="row px-4 my-5">
            <div className="col-sm-12 col-md-6 col-lg-7 mb-4">
              <img
                src="https://imagessl8.casadellibro.com/a/l/t7/28/9788408175728.jpg"
                className="img-fluid rounded"
                width="350"
                alt="Book Cover"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-5">
              <h1 className="fw-light">El Codigo Da Vinci</h1>
              <div onClick={() => setOpenSinopsis(!openSinopsis)} aria-controls="example-collapse-text" aria-expanded={openSinopsis} className="my-3" style={{cursor: 'pointer', borderTop: '1px solid #000', borderBottom: '1px solid #000', padding: '10px 0'}}>
                <div className="row align-items-center">
                  <div className="col-10 col-sm-11">
                    <p style={{fontWeight: 'bold', marginBottom: '0'}}>Rese&ntilde;a</p>
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
                <a href={"/Login" + param} className="btn btn-primary btn-lg">Pedir en Mesa</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PaginaLibro;
