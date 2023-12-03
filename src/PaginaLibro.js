import React, { useState, useEffect } from 'react';
import axios from "axios";
import { FaAngleDown } from 'react-icons/fa';
import './PaginaLibro.css';

const getBookDetails = async (id) => {
	const query = `
		query myQuery {
			getLibro(id: "${id}") {
				id
				nombre
				foto
				autor
				copias
        sinopsis
        anno
			}
		}
	`;
	try {
		const response = await axios.post("http://localhost:8080/graphql", {query});
		return response.data.data.getLibro;
	} catch (error) {
		console.error("Error al obtener detalles del libro", error);
		throw error;
	}
}

function PaginaLibro() {
  const [openSinopsis, setOpenSinopsis] = useState(false);
  const [openDetalle, setOpenDetalle] = useState(false);
  const [libro, setLibro] = useState(null);

  useEffect(() => {
    // Obtén el id del libro de la URL y elimina el carácter '#'
    const id = window.location.hash.substring(1);
    getBookDetails(id)
      .then(data => {
        // Aquí puedes usar los detalles del libro para actualizar el estado de tu componente
        setLibro(data);
      });
  }, []);

  if (!libro) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="PaginaLibro">
      <main>
        <div className="container">
          <div className="row px-4 my-5">
            <div className="col-sm-12 col-md-6 col-lg-7 mb-4">
              <img
                src={libro.foto + ".jpg"}
                className="img-fluid rounded"
                width="350"
                alt="Book Cover"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-5">
              <h1 className="fw-light">{libro.nombre}</h1>
              <div onClick={() => setOpenSinopsis(!openSinopsis)} aria-controls="example-collapse-text" aria-expanded={openSinopsis} className="my-3" style={{cursor: 'pointer', borderTop: '1px solid #000', borderBottom: '1px solid #000', padding: '10px 0'}}>
                <div className="row align-items-center">
                  <div className="col-10 col-sm-11">
                    <p style={{fontWeight: 'bold', marginBottom: '0'}}>Reseña</p>
                  </div>
                  <div className="col-2 col-sm-1">
                    <FaAngleDown />
                  </div>
                </div>
                {openSinopsis && 
                  <div id="example-collapse-text">
                    {libro.sinopsis}
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
                      Autor: {libro.autor}
                    </p>
                    <p className="my-3">
                      Año de publicación: {libro.anno}
                    </p>
                    <p className="my-3">
                      Copias disponibles: {libro.copias}
                    </p>
                  </div>
                }
              </div>
              
              <div className="d-grid gap-2">
                <a href={"/Login#" + libro.id} className="btn btn-primary btn-lg">Pedir en Mesa</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PaginaLibro;
