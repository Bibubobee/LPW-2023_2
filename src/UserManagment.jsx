
import {useState, useEffect} from 'react';
import axios from 'axios';


const DelUser = async (id,setDeletionSuccess,fetchData) => {
  const searchUserProfileQuery = `
    query GetUsuarioPerfiles($idUsuario: ID!) {
      getUsuarioPerfiles(idUsuario: $idUsuario) {
        id
      }
    }
  `;
  const searchUserProfileResponse = await axios.post('http://localhost:8080/graphql', {
    query:searchUserProfileQuery,
    variables: {
      idUsuario: id
    }
  });

  const deleteUsuarioPerfil = `
    mutation DeleteUsuarioPerfil($deleteUsuarioPerfilId: ID!) {
      deleteUsuarioPerfil(id: $deleteUsuarioPerfilId) {
        message
      }
    }
  `;
  const addProfileResponse = await axios.post('http://localhost:8080/graphql', {
    query: deleteUsuarioPerfil,
    variables: {
      "deleteUsuarioPerfilId": searchUserProfileResponse.data.data.getUsuarioPerfiles[0].id
    }
  });
  const query = `
      mutation myMutation($id: ID!) {
        deleteUsuario(id: $id){
          message
        }
      }
    `;
   const response = await axios.post('http://localhost:8080/graphql', {
    query,
    variables: {
      id: id
    }
  });
  console.log("BORAO")

  setDeletionSuccess(true);
  fetchData();
  return true;

}
const RegisterUser = async (nombre, pass, email, rut, telefono, userType, setRegistrationSuccess,fetchData) => {
  try {
    //tbala usuario
      //busqueda
    const searchQuery = `
      query myQuery {
        getUsuarios {
          rut
        }
      }
    `;
    const searchResponse = await axios.post('http://localhost:8080/graphql', {
      query: searchQuery
    });
    console.log(searchResponse.data.data.getUsuarios);
    const existingUser = searchResponse.data.data.getUsuarios.find(
      (user) => user.rut === rut
    );

    if (existingUser) {
      console.log('User already exists:', existingUser);
      setRegistrationSuccess(false);
      return existingUser;
    }
      //añadir weones
    const registerQuery = `
      mutation myMutation($input: UsuarioInput) {
        addUsuario(input: $input) {
          id
          email
          pass
          nombre
          rut
          telefono
          foto
        }
      }
    `;
    const registerResponse = await axios.post('http://localhost:8080/graphql', {
      query: registerQuery,
      variables: {
        input: {
          email: email,
          pass: "password",
          nombre: nombre,
          rut: rut,
          telefono: telefono,
          foto: "/UserWithNoPFP.png",
        }
      }
    });
    const newUser = registerResponse.data.data.addUsuario;
    console.log(newUser)
    //perfiles
      //buscar id de perfil
    const searchProfileQuery = `
      query myQuery {
        getPerfiles {
          id
          tipo
        }
      }
    `;
    const searchProfileResponse = await axios.post('http://localhost:8080/graphql', {
      query:searchProfileQuery
    });
    console.log(searchProfileResponse.data.data.getPerfiles)
    console.log(userType)
    const foundProfile = searchProfileResponse.data.data.getPerfiles.find(
      (usuarioPerfil) => usuarioPerfil.tipo === userType,
    );

      //añadir a usuarioperfil
    const AddProfileQuery = `
      mutation myMutation($input: UsuarioPerfilInput) {
        addUsuarioPerfil(input: $input) {
          id
        }
      }
    `;
    const addProfileResponse = await axios.post('http://localhost:8080/graphql', {
      query: AddProfileQuery,
      variables: {
        input: {
          usuario: newUser.id.toString(),
          perfil: foundProfile.id.toString()
        }
      }
    });


    console.log('User registered successfully:', newUser);
    setRegistrationSuccess(true);
    fetchData();
    return newUser;
  } catch (error) {
    console.error('Error during user registration', error);
    setRegistrationSuccess(false);
    fetchData();
    throw error;
  }
};


function UserManagment() {
    const [userData, setUserData] = useState([]);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [deletionSuccess, setDeletionSuccess] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        pass: '',
        email: '',
        rut: '',
        telefono: '',
        tipoUsuario: '' //{ User: 0, Librarian: 1, Admin: 2 };
    });
    const fetchData = async () => {
        try {
          const response = await axios.post('http://localhost:8080/graphql', {
            query: `
              query {
                getUsuarios {
                  id
                  nombre
                  email
                  rut
                  telefono
                }
              }
            `,
          });
        setUserData(response.data.data.getUsuarios);
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      };
    useEffect(() => {
      fetchData();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
            console.log("WDAJIEW")
            setFormData({ ...formData, [name]: value });
        };
    const handleSubmit = async (e) => {
        console.log("AAAAAAAAAAAAAAaa")
        e.preventDefault();
        try {
          await RegisterUser(
            formData.nombre,
            formData.pass,
            formData.email,
            formData.rut,
            formData.telefono,
            formData.userType,
            setRegistrationSuccess,
            fetchData
          );
        } catch (error) {
        }
    };
    const handleDelSubmit = async (e) => {
        console.log("AAAAAAAAAAAAAAaa")
        e.preventDefault();
        try {
          await DelUser(
            formData.id,
            setDeletionSuccess,
            fetchData
          );
        } catch (error) {
        }
    };

    return (
        <div class = "container">
            <div className="row mt-3">
              <div className="row">
                <div className="col-6 col-md-2 mb-3 mb-md-0">
                  <button className="btn btn-primary btn-sm w-100" data-bs-toggle="modal" data-bs-target="#AddUser">
                    Agregar Usuario
                  </button>
                </div>
                <div className="col-6 col-md-2 offset-md-8">
                  <button className="btn btn-primary btn-sm w-100" data-bs-toggle="modal" data-bs-target="#DelUser">
                    Eliminar Usuario
                  </button>
                </div>
              </div>
            </div>
            <div className ="row" style = {{margin:"5% auto"}}>
                <div className="table-responsive">
                    <table className="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col-md col-sm-1 d-flex justify-content-center">
                                    ID Usuario
                                </th>
                                <th scope="col-md col-sm-2 d-flex justify-content-center">
                                    Nombre persona
                                </th>
                                <th scope="col-md col-sm-6 d-flex justify-content-center">
                                    Correo Electronico
                                </th>
                                <th scope="col-md col-sm-1 d-flex justify-content-center">Rut</th>
                                <th scope="col-md col-sm-2 d-flex justify-content-center">
                                    Telefono
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                          {userData.map((user, index) => (
                            <tr key={user.id}>
                              <th scope="row">{user.id}</th>
                              <td>{user.nombre}</td>
                              <td>{user.email}</td>
                              <td>{user.rut}</td>
                              <td>{user.telefono}</td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                </div>
            </div>
          <div className="modal fade" tabIndex="-1" id = "AddUser">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Añadir usuario</h5>
                  <button
                    type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Nombre persona</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Correo Electronico</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Rut</label>
                      <input
                        type="text"
                        className="form-control"
                        name="rut"
                        value={formData.rut}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Telefono</label>
                      <input
                        type="text"
                        className="form-control"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Tipo de Usuario</label>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="userType"
                          value="usuario"
                          checked={formData.userType === 'usuario'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label">Usuario</label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="userType"
                          value="bibliotecario"
                          checked={formData.userType === 'bibliotecario'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label">Bibliotecario</label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="userType"
                          value="admin"
                          checked={formData.userType === 'admin'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label">Admin</label>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  {registrationSuccess && (
                    <p className="text-success">
                      Usuario registrado exitosamente.
                    </p>
                  )}
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Cerrar
                  </button>
                  <button type="submit" className="btn btn-primary" onClick ={handleSubmit}>
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" tabIndex="-1" id = "DelUser">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Eliminar usuario</h5>
                  <button
                    type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Id Usuario</label>
                      <input
                        type="text"
                        className="form-control"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  {deletionSuccess && (
                    <p className="text-success">
                      Usuario eliminado exitosamente.
                    </p>
                  )}
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Cerrar
                  </button>
                  <button type="button" className="btn btn-primary" onClick ={handleDelSubmit}>
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>    
    );
}

export default UserManagment;
