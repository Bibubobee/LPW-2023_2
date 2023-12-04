import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

function AdminBookview() {
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
    <div className="container">
      <div className="row px-4 my-5">
        <div className="col-sm-7">
          <img src={libro.foto + ".jpg"} 
            className="img-fluid rounded " 
            alt="Book Cover" 
            width={350}  
          /> 
        </div>
        <div className="col-sm-5">
        <h1 className="fw-light">{libro.nombre}</h1>
          <div style={{ height: '60vh', overflowY: 'auto' }}>
            <div className="table-responsive">
              <table class="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th scope="col-md col-sm-1 d-flex justify-content-center">#copia</th>
                    <th scope="col-md col-sm-2 d-flex justify-content-center">Estado del libro</th>
                    <th scope="col-md col-sm-6 d-flex justify-content-center">Prestado o no</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Dañado</td>
                    <td>Prestado</td>
                  </tr>
                </tbody> 
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row px-4 my-5 justify-content-center">
        <div className="col-12 col-md-3 mb-3 mb-md-0 d-grid gap-2">
          <button className="custom-button btn btn-primary btn-md w-100" data-bs-toggle="modal" data-bs-target="#addcopy">
            Agregar ejemplares 
          </button>
        </div>
        <div className="col-12 col-md-3 mb-3 mb-md-0 d-grid gap-2">
          <button className="custom-button btn btn-primary btn-md w-100" data-bs-toggle="modal" data-bs-target="#askforcopy">
            Pedir ejemplares a bodega
          </button>
        </div>
        <div className="col-12 col-md-3 d-grid gap-2">
          <button className="custom-button btn btn-primary btn-md w-100" data-bs-toggle="modal" data-bs-target="#delcopy">
            Eliminar ejemplares
          </button>
        </div>
      </div>

      <div className="modal fade" tabIndex="-1" id = "addcopy">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Añadir ejemplar del Libro</h5>
              <button
                type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Estado de la copia</label>
                  <input type="text" className="form-control"/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
              <button type="button" className="custom-button btn btn-primary">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" tabIndex="-1" id = "delcopy">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Eliminar ejemplar del Libro</h5>
              <button
                type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">ID de la copia</label>
                  <input type="text" className="form-control"/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
              <button type="button" className="custom-button btn btn-primary">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" tabIndex="-1" id = "askforcopy">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Solicitar ejemplar del Libro a bodega</h5>
              <button
                type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Numero de copias</label>
                  <input type="text" className="form-control"/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
              <button type="button" className="custom-button btn btn-primary">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBookview;