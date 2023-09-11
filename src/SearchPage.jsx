import "./SearchPage.css"
import { Link } from 'react-router-dom';


function SearchPage(){
    const param = "parametros_magicos_para_despues"
    return (
        <body>
            <div> 
                <div class="row g-3 pt-5">
                    <div class="col-10 mx-auto">
                        <div style={{height:80}}>
                            <input type="text" class="form-control form-control-lg h-100" placeholder="Nombre del Libro"/>
                        </div>
                    </div>
                </div>

                <div class="row g-3 pt-3 pb-3">
                    <div class="col-10 mx-auto">
                        <label>Seleccionar Género</label>
                        <select class="form-select">
                            <option value="1">Cuento</option>
                            <option value="2">Sci-Fi</option>
                            <option value="3">Romance</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class = "row g-3">
                <div class="col-1"></div>
                <div class="col-8 ">
                    <button type="submit" class="btn btn-success">Buscar</button>
                </div>
            </div>
            <div class="container">
                <div class="row mt-5">
                    {BookProduct()}
                    {BookProduct()}
                    {BookProduct()}
                    {BookProduct()}
                    {BookProduct()}
                    {BookProduct()}
                    {BookProduct()}
                </div>
            </div>
        </body>
    );
}

function BookProduct(){
    const param = "parametros_magicos_para_despues"
    return(

        <div class="col-lg-3 col-sm-12 col-md-6 mt-3">
            <a class="card" href={'/PaginaLibro#'+param}  style={{"textDecoration": "None;"}}>                
                    <div class="card-body bg-light">
                        <div class="text-center">
                            <h4 class="card-title font-weight-semibold">El Manifiesto Comunista</h4>
                            <div class="card-img-actions">
                                <img src={require('./temp.jpg')} class="card-img img-fluid" width="100" height="150" alt=""/>
                            </div>
                        </div>
                        <div class="text-left">
                            <h6 class="text-muted mt-2">Autor: Karl Marx & Friedrich Engels</h6>
                            <h6 class="text-muted">Stock: 10</h6>
                        </div>
                    </div>
            </a>
        </div>
    )
}

export default SearchPage;