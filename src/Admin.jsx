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
            usuario {
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

        const detallesPromises = prestamosData.map(async (prestamo) => {
          const responseDetalles = await axios.post(
            'http://localhost:8080/graphql',
            {
              query: `
                query GetDetallePrestamos($idPrestamo: ID!) {
                  getDetallePrestamos(idPrestamo: $idPrestamo) {
                    id
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

          const detalles = responseDetalles.data.data.getDetallePrestamos.map(async (detalle) => {
            const responseEjemplar = await axios.post(
              'http://localhost:8080/graphql',
              {
                query: `
                  query GetEjemplar($getEjemplarId: ID!) {
                    getEjemplar(id: $getEjemplarId) {
                      libro {
                        nombre
                      }
                    }
                  }
                `,
                variables: {
                  "getEjemplarId": detalle.ejemplar,
                },
              }
            );

            return {
              id: detalle.id,
              en_casa: detalle.en_casa,
              fecha_limite: detalle.fecha_limite,
              fecha_devolucion: detalle.fecha_devolucion,
              usuario: response.data.data.getPrestamos[0].usuario.rut,
              libro: responseEjemplar.data.data.getEjemplar.libro.nombre
            };
          });
          return Promise.all(detalles);
        });

        const detalles = await Promise.all(detallesPromises);
        const flattenedDetalles = detalles.flat();
        const prestamosConDetalles = prestamosData.map((prestamo, index) => ({
          ...prestamo,
          detalles: Array.isArray(flattenedDetalles[index])? flattenedDetalles[index] : [flattenedDetalles[index]],
        }));

        setPrestamos(prestamosConDetalles);
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
                  <th scope="col-md col-sm-2 d-flex justify-content-center">Rut Persona</th>
                  <th scope="col-md col-sm-2 d-flex justify-content-center">Nombre Libro</th>
                  <th scope="col-md col-sm-2 d-flex justify-content-center">Tipo Prestamo</th>
                  <th scope="col-md col-sm-2 d-flex justify-content-center">Tiempo Restante</th>
                </tr>
              </thead>
              <tbody>
                {prestamos.map((prestamo) => {
                  // Verificar si 'detalles' es un array antes de intentar mapearlo
                  const detallesArray = Array.isArray(prestamo.detalles) ? prestamo.detalles : [];
                  console.log(prestamo, "a")
                  const detallesConDevolucion = detallesArray.filter((detalle) => detalle.fecha_devolucion == "X-X-X");

                  // Mapear sobre 'detallesArray' en lugar de 'prestamo.detalles'
                  return detallesConDevolucion.map((detalle) => (
                    <tr key={detalle.id}>
                      <th scope="row">{detalle.id}</th>
                      <td>{detalle.usuario}</td>
                      <td>{detalle.libro}</td>
                      <td>{detalle.en_casa ? 'En Casa' : 'En Biblioteca'}</td>
                      <td>{detalle.fecha_limite}</td>
                    </tr>
                  ));
                })}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Admin;