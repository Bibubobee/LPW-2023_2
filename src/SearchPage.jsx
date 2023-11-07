import "./SearchPage.css";
import { Link } from 'react-router-dom';
import TagSearch from './TagSearch';
import React, { useEffect, useState } from 'react';

function SearchPage() {
  const param = "parametros_magicos_para_despues";
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    console.log(contentVisible)
    const timeout = setTimeout(() => {
      setContentVisible(true);
    }, 100); // Adjust the delay as needed
    return () => clearTimeout(timeout);
  });

  return (
    <div className={`custom-container  ${contentVisible ? 'loaded' : ''}`}>
      <div className="row g-3 pt-5">
        <div className="col-12 mx-auto">
          <div style={{ height: 80 }}>
            <input
              type="text"
              className="form-control form-control-lg h-100"
              placeholder="Nombre del Libro"
            />
          </div>
        </div>
      </div>

      <div className="row g-3 pt-3 pb-3">
        <div className="col-6 col-md-6 col-lg-6">
          <h5>Seleccionar Género</h5>
          <TagSearch />
        </div>
      <div className="col-6 col-md-6 col-lg-6 d-flex justify-content-end">
        <button style={{ height: 60}} type="submit" className="btn btn-success">
          Buscar
        </button>
      </div>
      </div>
      <div className="row mt-5 d-flex justify-content-sm-center justify-content-lg-between">
        {BookProduct()}
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

function BookProduct() {
  const param = "parametros_magicos_para_despues";
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mt-5" style={{width: "250px", height: "400px"}}>
      <a className="card card-sm" href={"/PaginaLibro#" + param} style={{ textDecoration: "none" }} title="El Manifiesto Comunista">
        <div className="text-center pb-3 pt-3">
          <img src={require('./temp.jpg')} className="card-image-top img-shadow" width="60%" height="auto" alt="" />
        </div>
        <div className="card-body bg-dark">
          <h5 className="text-center card-title fw-bold">El Manifiesto Comunista</h5>
          <h6 className="text-center">Karl Marx & Friedrich Engels</h6>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success" >
              Pedir
            </button>
          </div>
        </div>
      </a>
    </div>
  );
}

export default SearchPage;
