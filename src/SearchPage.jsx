import "./SearchPage.css";
import { Link } from 'react-router-dom';
import TagSearch from './TagSearch';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { getValue } from "@testing-library/user-event/dist/utils";

const getBooks = async () => {
	const query = `
		query myQuery {
			getLibros{
				id
				nombre
				foto
				autor
				copias
			}
		}
	`;
	try {
		const response = await axios.post("http://localhost:8080/graphql", {query});
		return response.data.data.getLibros;
	} catch (error) {
		console.error("Error al obtener libros", error);
		throw error;
	}
}

const getGeneroLibros = async (libro) => {
	const query = `
		query myQuery ($idLibro: ID!) {
			getLibroGeneros (idLibro: $idLibro ){
				id
				genero {
					nombre
				}
			}
		}
	`;
	try {
		const response= await axios.post("http://localhost:8080/graphql", {
			query,
			variables : {
				idLibro : libro.toString()
			}
		});
		return response.data.data.getLibroGeneros;
	} catch (error) {
		console.error("Error al obtener generos del libro", error);
		throw error;
	}
}


function SearchPage() {
	const [contentVisible, setContentVisible] = useState(false);
	const [libros, setLibros] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [searchGenre, setSearchGenre] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSearchValue(document.getElementById("search_book").value);
	}

	useEffect(() => {
		getBooks()
			.then(data => setLibros(data));
		
		libros.forEach(libro => {
			libro.generos = [];
			getGeneroLibros(libro.id)
				.then(genero => console.log(genero.nombre))
		});
		console.log(libros);
		
		console.log(contentVisible);
		const timeout = setTimeout(() => {
		setContentVisible(true);
		}, 100); // Adjust the delay as needed
		return () => clearTimeout(timeout);
	}, []);

	const filtered = libros.filter(
        libro =>
            libro.nombre.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || 
            libro.autor.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
			libro.generos.some(genero => {
				return searchGenre.includes(genero);
			})
	);

	return (
	<div>
		<div className={`custom-container  ${contentVisible ? 'loaded' : ''}`}>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div className="row g-3 pt-5">
					<div className="col-12 mx-auto">
						<div style={{ height: 80 }}>
							<input
							id="search_book"
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
						<TagSearch 
						searchGenre={searchGenre} 
						setSearchGenre={setSearchGenre}/>
					</div>
					<div className="col-6 col-md-6 col-lg-6 d-flex justify-content-end">
						<button style={{ height: 60}} type="submit" className="custom-button btn btn-success">
						Buscar
						</button>
					</div>
				</div>
			</form>
			<div className="row mt-5 d-flex justify-content-sm-center justify-content-lg-between">
				{ 
					filtered.map(libro => (
					<BookProduct id={libro.id} nombre={libro.nombre} autor={libro.autor} copias={libro.copias} foto={libro.foto}/>
					))
				}
			</div>
		</div>
	</div>
	);
}

function BookProduct( {id, nombre, autor, copias, foto} ) {
	const enable_btn = copias === 0;
	
	return (
		<div className="col-lg-3 col-md-4 col-sm-6 mt-5" style={{width: "250px", height: "400px"}}>
		<a className="card card-sm" href={"/PaginaLibro#" + id} style={{ textDecoration: "none" }} title={nombre}>
			<div className="text-center pb-3 pt-3">
			<img src={foto + ".jpg"} className="card-image-top img-shadow" width="60%" height="auto" alt="" />
			</div>
			<div className="card-body bg-dark">
			<h5 className="text-center card-title fw-bold">{nombre}</h5>
			<h6 className="text-center">{autor}</h6>
			<div className="d-flex justify-content-center">
				<button type="submit" className="custom-button-card btn btn-success" disabled={enable_btn}>
				Pedir
				</button>
			</div>
			</div>
		</a>
		</div>
	);
}

export default SearchPage;
