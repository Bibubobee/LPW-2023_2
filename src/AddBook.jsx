import './AddBook.css'
import {useState} from 'react';
import axios from 'axios';
import TagSearch from './TagSearch';
// nombre: String!
// año: Int!
// copias: Int!
// autor: String!
// sinopsis: String!
// foto: String!

const RegisterBook = async (nombre, anno, autor, sinopsis, foto) => {
    const query = `
        mutation myMutation($input : LibroInput){
            addLibro(input : $input){
                id
                nombre
                anno
                copias
                autor
                sinopsis
                foto
            }
        }
    `;

    try{
        const response = await axios.post('http://localhost:8080/graphql', {
            query,
            variables : {
                input : {
                    nombre: nombre,
                    anno: parseInt(anno),
                    copias: 1,
                    autor: autor,
                    sinopsis: sinopsis,
                    foto: foto
                }
            }
        });
        
        return response.data;
    } catch (error) {
        console.error("Error al registrar el libro", error);
        throw error;
    }
}

const RegisterGenreBook = async (libro, genero) => {
    const query = `
        mutation myMutation($input : LibroGeneroInput){
            addLibroGenero(input : $input){
                id
            }
        }
    `;

    try{
        const response = await axios.post('http://localhost:8080/graphql', {
            query,
            variables : {
                input : {
                    libro: libro.toString(),
                    genero: genero.toString()
                }
            }
        });
        
        return response.data;
    } catch (error) {
        console.error("Error al registrar el genero del libro", error);
        throw error;
    }
}

function AddBook(){
    const [nombre, setNombre] = useState('');
    const [anno, setAnno] = useState('');
    const [autor, setAutor] = useState('');
    const [sinopsis, setSinopsis] = useState('');
    const [foto, setFoto] = useState('');
    const [generos, setGeneros] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if([nombre, anno, autor, sinopsis, foto].includes('')){
            alert("No se pudo ingresar el libro, quedan campos por rellenar.");
            return;
        }
        const result = await RegisterBook(nombre, anno, autor, sinopsis, foto);

        for (let index = 0; index < generos.length; index++) {
            const resultGenre = await RegisterGenreBook(result.data.addLibro.id, generos[index].id);
            console.log("Genero del Libro registrado", resultGenre);
        }

        alert("Libro registrado");
    }

    return (
        <form className='BookForm pt-3 h4'
            onSubmit={handleSubmit}
        >
            <div className='h6 text-danger'>*Todos los campos son obligatorios</div>
            <div>
                <label for='nombre' className='form-label'>Nombre libro</label>
                <input 
                    id="nombre" 
                    type='text' 
                    className='form-control mb-3'
                    placeholder='Ingrese nombre' 
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                >
                </input>
            </div>

            <div>
                <label for='anno' className='form-label'>Año de publicación</label>
                <input 
                    id="anno" 
                    type='text'
                    className='form-control mb-3' 
                    placeholder='Ingrese año' 
                    value={anno}
                    onChange={(e) => setAnno(e.target.value)}
                >
                </input>
            </div>

            <div>
                <label for='autor' className='form-label'>Autor del libro</label>
                <input 
                    id="autor" 
                    type='text' 
                    className='form-control mb-3' 
                    placeholder='Ingrese nombre del autor' 
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                >
                </input>
            </div>

            <div className='mb-3'>
                <label for='tags' className='form-label'>Género(s)</label>
                <TagSearch 
                    id="tags"
                    searchGenre={generos} 
                    setSearchGenre={setGeneros}/>
            </div>

            <div>
                <label for='sinopsis' className='form-label'>Sinopsis del libro</label>
                <textarea 
                    id="sinopsis" 
                    type='text' 
                    className='form-control mb-3' 
                    rows="10"
                    placeholder='Ingrese sinopsis del libro' 
                    value={sinopsis}
                    onChange={(e) => setSinopsis(e.target.value)}
                >
                </textarea>
            </div>

            <div>
                <label for='foto' className='form-label'>Dirección de la foto del libro (Nombre del archivo en la carpeta public, sin .jpg)</label>
                <input
                    id="foto" 
                    type='text'
                    className='form-control mb-3'  
                    placeholder='Ingrese dirección de la foto' 
                    value={foto}
                    onChange={(e) => setFoto(e.target.value)}
                >
                </input>
            </div>
            {/* <div className='text-right'> */}
                <button type="submit" className='custom-button btn btn-primary float-end btn-lg mb-5'>Agregar Libro</button>
            {/* </div> */}
        </form>
    )
}

export default AddBook;