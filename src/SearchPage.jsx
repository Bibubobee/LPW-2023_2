import "./SearchPage.css"

function SearchPage(){
    return (
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
    );
}

function BookProduct(){
    return(
        <div class="col-lg-3 col-sm-12 col-md-6 mt-3">
            <a class="card" href="#!" style={{"textDecoration": "None;"}}>                
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