import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaAngleDown } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import "./BiblioBookview.css";

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

const updateBookDetails = async (id, input) => {
  const mutation = `
    mutation myMutation {
      updateLibro(id: "${id}", input: ${JSON.stringify(input).replace(/\"([^(\")"]+)\":/g, '$1:')}) {
        id
        nombre
        sinopsis
        anno
        autor
      }
    }
  `;
  try {
    const response = await axios.post("http://localhost:8080/graphql", {query: mutation});
    return response.data.data.updateLibro;
  } catch (error) {
    console.error("Error al actualizar detalles del libro", error);
    throw error;
  }
}

function BiblioBookview() {
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
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const nombre = form.elements['nombre'].value;
    const sinopsis = form.elements['sinopsis'].value;
    const anno = parseInt(form.elements['anno'].value);
    const autor = form.elements['autor'].value;
    const foto = libro.foto; // Asumiendo que la foto no cambia
    const copias = libro.copias; // Asumiendo que el número de copias no cambia
  
    const input = { nombre, sinopsis, anno, autor, foto, copias };
  
    updateBookDetails(libro.id, input)
      .then(updatedLibro => {
        setLibro(updatedLibro);
      });
  };
  

    return (
        <div className="container">
          <div className="row px-4 my-5">
            <div className="col-sm-7">
              <img src={libro.foto + ".jpg"}
                className="img-fluid rounded" 
                alt="Book Cover" 
                width={350}  
              />
            </div>
            <div className="col-sm-5">
            <h1 className="fw-light">{libro.nombre}</h1>
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
                      Año de Publicación: {libro.anno}
                    </p>
                    <p className="my-3">
                      Copias Disponibles: {libro.copias}
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
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label className="form-label">Título</label>
                <input type="text" className="form-control" name="nombre" defaultValue={libro.nombre}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Sinopsis</label>
                <input type="text" className="form-control" name="sinopsis" defaultValue={libro.sinopsis}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Año de Publicación</label>
                <input type="text" className="form-control" name="anno" defaultValue={libro.anno}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Autor</label>
                <input type="text" className="form-control" name="autor" defaultValue={libro.autor}/>
              </div>
              <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cerrar
            </button>
            <button type="submit" className="btn btn-primary">
              Guardar Cambios
            </button>
          </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
        </div>
  );
}

export default BiblioBookview;