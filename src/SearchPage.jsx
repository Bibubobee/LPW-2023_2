import "./SearchPage.css"
import { Link } from 'react-router-dom';
import TagSearch from './TagSearch'

function SearchPage(){
    const param = "parametros_magicos_para_despues"
    return (
            <div class="container"> 
                <div class="row g-3 pt-5">
                    <div class="col-12 mx-auto">
                        <div style={{height:80}}>
                            <input type="text" class="form-control form-control-lg h-100" placeholder="Nombre del Libro"/>
                        </div>
                    </div>

                    <div class="col-12 mx-auto pt-1">
                        <button type="submit" class="btn btn-success">Buscar</button>
                    </div>
                </div>

                <div class="row g-3 pt-3 pb-3">
                    <div class="col-1 mx-auto">
                        <h5>Seleccionar Género</h5>
                        <TagSearch/>
                    </div>
                    <div class="col-1 mx-auto">
                        <button type="submit" class="btn btn-success">Buscar</button>
                    </div>
                </div>
                <div class="row g-5 mt-5">
                    {BookProduct()}
                    {BookProduct()}
                    {BookProduct()}
                    {BookProduct()}
                    {BookProduct()}
                    {BookProduct()}
                    {BookProduct()}
                </div>
            </div>
    );
}

function BookProduct(){
    const param = "parametros_magicos_para_despues"
    return(
        <div class="col-lg-3 col-md-6 col-sm-12 mt-5">
            <a class="card card-sm" href="#!" style={{"textDecoration": "None"}}>   
                <div class="text-center pb-3 pt-3">
                    <img src={require('./temp.jpg')} class="card-image-top img-shadow" width="60%" height="auto" alt=""/>
                </div>             
                <div class="card-body bg-dark">
                    <h5 class="text-center card-title fw-bold">El Manifiesto Comunista</h5>
                    <h6 class="text-center">Karl Marx & Friedrich Engels</h6>
                    <div class="d-flex justify-content-center">
                        <button type="submit" class="btn btn-success">Pedir</button>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default SearchPage;