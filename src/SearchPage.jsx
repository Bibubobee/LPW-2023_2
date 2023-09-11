import "./SearchPage.css"

function SearchPage(){
    return (
        <body class="body">
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

                {/* <div class="row g-3 pt-3 pb-3">
                    <div class="col-10 mx-auto">
                        <label>Seleccionar Género</label>
                        <select class="form-select">
                            <option value="1">Cuento</option>
                            <option value="2">Sci-Fi</option>
                            <option value="3">Romance</option>
                        </select>
                    </div>
                </div> */}
                <div class="row mt-5 mx-auto">
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
    return(
        <div class="col-lg-3 col-sm-12 col-md-6 mt-3">
            <a class="card" href="#!" style={{"textDecoration": "None"}}>   
                <div class="text-center pb-3 pt-3">
                    <img src={require('./temp.jpg')} class="card-image-top img-shadow" width="60%" height="auto" alt=""/>
                </div>             
                <div class="card-body">
                    <h5 class="text-center card-title fw-bold">El Manifiesto Comunista</h5>
                    <h6 class="text-center">Karl Marx & Friedrich Engels</h6>
                    
                    
                    {/* <div class="text-left">
                        <h6 class="text-muted mt-2">Autor: Karl Marx & Friedrich Engels</h6>
                        <h6 class="text-muted">Stock: 10</h6>
                    </div> */}
                </div>
            </a>
        </div>
    )
}

export default SearchPage;