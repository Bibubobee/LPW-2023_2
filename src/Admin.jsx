import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
    const fetchData = async () => {
      const getPrestamos = `
        query GetPrestamos {
          getPrestamos {
            id
            usuario{
              rut
            }
          }
        }
      `;

      try {
        const response = await axios.post(
          'http://localhost:8080/graphql',
          {
            query: getPrestamos,
          }
        );

        const prestamosData = response.data.data.getPrestamos;
        console.log(prestamosData)

        const detallesPromises = prestamosData.map(async (prestamo) => {
          const responseDetalles = await axios.post(
            'http://localhost:8080/graphql',
            {
              query: `
                query GetDetallePrestamos($idPrestamo: ID!) {
                  getDetallePrestamos(idPrestamo: $idPrestamo) {
                    en_casa
                    fecha_limite
                    ejemplar
                    fecha_devolucion
                  }
                }
              `,
              variables: {
                idPrestamo: prestamo.id,
              },
            }
          );
          if(responseDetalles!= null){
            return responseDetalles.data.data.getDetallePrestamos;
          }
        });

        const detalles = await Promise.all(detallesPromises);
        // Combinar los detalles con los préstamos
        const prestamosConDetalles = prestamosData.map((prestamo, index) => ({
          ...prestamo,
          detalles: detalles[index],
        }));
        console.log(detalles)
        
        setPrestamos(prestamosData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="row" style={{ margin: '5% auto' }}>
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col-md col-sm-2 d-flex justify-content-center">ID</th>
                  <th scope="col-md col-sm-2 d-flex justify-content-center">Nombre Persona</th>
                  <th scope="col-md col-sm-2 d-flex justify-content-center">Nombre Libro</th>
                  <th scope="col-md col-sm-2 d-flex justify-content-center">Tipo Prestamo</th>
                  <th scope="col-md col-sm-2 d-flex justify-content-center">Tiempo Restante</th>
                </tr>
              </thead>
              <tbody>
                {prestamos.map((prestamo) => (
                  if(prestamo.detalles){
                  prestamo.detalles.map((detalle) => (
                    <tr key={detalle.id}>
                      <th scope="row">{detalle.id}</th>
                      <td>{prestamo.usuario.nombre}</td>
                      <td>{detalle.ejemplar.libro.nombre}</td>
                      <td>{detalle.en_casa ? 'En Casa' : 'En Biblioteca'}</td>
                      <td>{detalle.fecha_devolucion}</td>
                    </tr>
                  ))
                  }
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
