import './AddBook.css'
import {useState} from 'react';
// nombre: String!
// año: Int!
// copias: Int!
// autor: String!
// sinopsis: String!
// foto: String!

function AddBook(){
    const [nombre, setNombre] = useState('');
    const [anno, setAnno] = useState('');
    const [autor, setAutor] = useState('');
    const [sinopsis, setSinopsis] = useState('');
    const [foto, setFoto] = useState('');

    return (
        <form className='BookForm pt-3 h4'>
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
                <label for='foto' className='form-label'>Dirección de la foto del libro </label>
                <input
                    id="foto" 
                    type='text'
                    className='form-control mb-3'  
                    placeholder='Ingrese foto del libro (dirección local del archivo)' 
                    value={foto}
                    onChange={(e) => setFoto(e.target.value)}
                >
                </input>
            </div>
            {/* <div className='text-right'> */}
                <button type="submit" className='btn btn-primary float-end btn-lg mb-5'>Agregar Libro</button>
            {/* </div> */}
        </form>
    )
}

export default AddBook;