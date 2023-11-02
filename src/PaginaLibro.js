import React from 'react';
import './PaginaLibro.css';

function PaginaLibro() {
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
              <p className="my-3">
                Sinopsis: Robert Langdon recibe una llamada en mitad de la noche:
                el conservador del museo del Louvre ha sido asesinado en extrañas circunstancias y junto a
                su cadáver ha aparecido un desconcertante mensaje cifrado. Al profundizar en la investigación,
                Langdon, experto en simbología, descubre que las pistas conducen a las obras de Leonardo Da Vinci…
                y que están a la vista de todos, ocultas por el ingenio del pintor.
              </p>
              <p className="my-3">
                Fecha de Publicación: 29-08-2017
              </p>
              <p className="my-3">
                Autor: Dan Brown
              </p>
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
