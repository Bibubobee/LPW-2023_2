import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth} from './AuthContext';

function obtenerFechaFormateada(fecha) {
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const anio = fecha.getFullYear().toString();

  return `${dia}-${mes}-${anio}`;
}

const DeclineSolitude = async (solicitud) => {
  console.log(solicitud);
  const updatesolitude = `
    mutation UpdateSolicitud($updateSolicitudId: ID!, $input: SolicitudInput) {
      updateSolicitud(id: $updateSolicitudId, input: $input) {
        id
      }
    }
  `;
  try {
    const response = await axios.post('http://localhost:8080/graphql', {
      query: updatesolitude,
      variables: {
        updateSolicitudId: solicitud.id,
        input: {
          estado: 'rechazada',
          libro: solicitud.libro.id,
          usuario: solicitud.usuario.id,
        },
      },
    });
    alert('solicitud rechazada con exito');
  } catch (error) {
    console.log('errrrrrrrrrrror', error);
  }
};

const AcceptSolitude = async (solicitud, s_en_casa, s_direccion, s_numeroEjemplar,state) => {
  const getEjemplar = `
      query Query($getEjemplarId: ID!) {
      getEjemplar(id: $getEjemplarId) {
        libro {
          id
        }
      }
    }
  `;
  const updatesolitude = `
    mutation UpdateSolicitud($updateSolicitudId: ID!, $input: SolicitudInput) {
      updateSolicitud(id: $updateSolicitudId, input: $input) {
        id
      }
    }
  `;
  try {
    const responseEjemplar = await axios.post('http://localhost:8080/graphql', {
      query: getEjemplar,
      variables: {
        getEjemplarId: s_numeroEjemplar,
      },
    });
    if(responseEjemplar.data.data.getEjemplar.libro.id == solicitud.libro.id){ 
      console.log(solicitud)
      const response = await axios.post('http://localhost:8080/graphql', {
        query: updatesolitude,
        variables: {
          updateSolicitudId: solicitud.id,
          input: {
            estado: 'aceptada',
            libro: solicitud.libro.id,
            usuario: solicitud.usuario.id,
          },
        },
      });

      const createPrestamo = `
            mutation AddPrestamo($input: PrestamoInput) {
                addPrestamo(input: $input) {
                  id
                }
              }
            `;
      let bibliotecarioid = null;
      if (state.user){
        bibliotecarioid = state.user.id
      }
      const responsePrestamo = await axios.post('http://localhost:8080/graphql', {
        query: createPrestamo,
        variables: {
          input: {
            bibliotecario: bibliotecarioid,
            usuario: solicitud.usuario.id,
          },
        },
      });
      const createPrestamoDetalle = `
              mutation AddDetallePrestamo($input: DetallePrestamoInput) {
                addDetallePrestamo(input: $input) {
                  id
                }
              }
            `;
      console.log('idprestamo', responsePrestamo.data.data);
      const tday = new Date();
      const limit = new Date(tday);
      limit.setDate(tday.getDate() + 14); // Sumamos 14 días

      const responsePrestamoDetalle = await axios.post('http://localhost:8080/graphql', {
        query: createPrestamoDetalle,
        variables: {
          input: {
            ejemplar: s_numeroEjemplar? s_numeroEjemplar : "",
            direccion: s_direccion? s_direccion : "",
            en_casa: s_en_casa,
            fecha_limite: obtenerFechaFormateada(limit),
            fecha_devolucion: 'X-X-X',
            fecha_pedido: obtenerFechaFormateada(tday),
            prestamo: responsePrestamo.data.data.addPrestamo.id,
          },
        },
      });
      console.log(responsePrestamoDetalle)
      alert('solicitud aceptada con exito');
    }
    else{
      alert('numero de ejemplar invalido')
    }
  } catch (error) {
    console.log('errrrrrrrrrrror', error);
  }
};

const Historial = () => {
  const {state} = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    s_en_casa: false,
    s_direccion: '',
    s_numeroEjemplar: '',
  });

  const handleAceptar = (e) => {
    AcceptSolitude(selectedSolicitud, formData.s_en_casa,formData.s_direccion,formData.s_numeroEjemplar,state);
    console.log(`Aceptar solicitud ${selectedSolicitud}`);
  };

  const handleRechazar = (solicitud) => {
    DeclineSolitude(solicitud);
    console.log(`Rechazar solicitud ${solicitud}`);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        s_en_casa: checked
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleOpenModal = (solicitud) => {
    setSelectedSolicitud(solicitud);
  };
  useEffect(() => {
    const fetchData = async () => {
      const getSolicitudes = `
        query GetSolicitudes {
          getSolicitudes {
            id
            estado
            libro {
              id
              nombre
            }
            usuario {
              rut
              id
            }
          }
        }
      `;

      try {
        const response = await axios.post('http://localhost:8080/graphql', {
          query: getSolicitudes,
        });
        setSolicitudes(response.data.data.getSolicitudes);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [handleAceptar, handleRechazar]);


  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <header class="px-4 my-1">Historial de solicitudes</header>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="row" style={{ margin: '5% auto' }}>
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th scope="col-md col-sm-2 d-flex justify-content-center">ID</th>
                    <th scope="col-md col-sm-2 d-flex justify-content-center">Estado</th>
                    <th scope="col-md col-sm-2 d-flex justify-content-center">Rut Persona</th>
                    <th scope="col-md col-sm-2 d-flex justify-content-center">Nombre Libro</th>
                    <th scope="col-md col-sm-2 d-flex justify-content-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudes.map((solicitud) => (
                    <tr key={solicitud.id}>
                      <th scope="row">{solicitud.id}</th>
                      <td>{solicitud.estado}</td>
                      <td>{solicitud.usuario.rut}</td>
                      <td>{solicitud.libro.nombre}</td>
                      <td>
                        {solicitud.estado === 'pendiente' && (
                          <>
                            <button
                              className="btn btn-success"
                              onClick={() => handleOpenModal(solicitud)}
                              data-bs-toggle="modal"
                              data-bs-target="#modal"
                            >Aceptar</button>
                            <button
                              className="btn btn-danger ms-2"
                              onClick={() => handleRechazar(solicitud)}
                            >Rechazar
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" tabIndex="-1" id="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Aceptar Solicitud</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    name="s_direccion"
                    value={formData.s_direccion}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Número de Ejemplar</label>
                  <input
                    type="text"
                    className="form-control"
                    name="s_numeroEjemplar"
                    value={formData.s_numeroEjemplar}
                    onChange={handleChange}
                  />
                <div className="h6 text-danger">Campo obligatorio</div>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="esPrestamoCasa"
                    checked={formData.s_en_casa}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Es un préstamo para la casa</label>
                </div>
                <div className="h6 text-danger">Campo obligatorio</div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
              <button type="button" className="custom-button btn btn-primary" onClick={handleAceptar}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Historial;
