function BiblioBookview() {
    return(     
        <div class="container-fluid">
            <div class="row">
                <div class="col-4 text-center">
                    <div class="card w-100" style={{width: "18rem"}}>
                      <img src={require('./temp.jpg')} alt="portada placeholder" style = {{objectfit:"fill"}}/>
                      <div class="card-body">
                        <p class="card-text">desc</p>
                      </div>
                    </div>      
                </div>
                <div class="col-8 text-center" >
                    Column
                </div>
            </div>
        </div>
    )
}

export default BiblioBookview;
