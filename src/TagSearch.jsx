import React, { useState, useEffect } from 'react';
import './TagSearch.css';
import axios from "axios";

const getGenres = async () => {
  const query = `
		query myQuery {
			getGeneros{
				id
				nombre
			}
		}
	`;
	try {
		const response = await axios.post("http://localhost:8080/graphql", {query});
		return response.data.data.getGeneros;
	} catch (error) {
		console.error("Error al obtener generos", error);
		throw error;
	}
}

function TagSelection(props) {
  const selectedTags = props.searchGenre;
  const setSelectedTags = props.setSearchGenre;
  const [searchText, setSearchText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const [generos, setGeneros] = useState([]);

  useEffect(() => {
		getGenres()
			.then(data => setGeneros(data));
		
	}, []);

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    setShowDropdown(false);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setShowDropdown(true);
  };

  const filteredTags = generos.filter((tag) =>
    tag.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="tag-selection-container">
      <div className="dropdown">
        <button
          className="custom-button btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded={showDropdown}
        >
          Géneros
        </button>
        <ul
          className={`dropdown-menu ${showDropdown ? 'show' : ''} custom-dropdown-menu dropup`}
          aria-labelledby="dropdownMenuButton"
        >
          <li>
            <input
              type="text"
              className="form-control custom-search-input"
              placeholder="Buscar Tags"
              value={searchText}
              onChange={handleSearchChange}
            />
          </li>
          {filteredTags.map((tag) => (
            <li key={tag.nombre} className="text-center">
              <button
                className={`btn custom-button ${selectedTags.includes(tag.nombre) ? 'btn-primary' : 'btn-outline-primary'} px-5 mt-2`}
                onClick={() => handleTagClick(tag.nombre)}
				type="button"
              >
                {tag.nombre}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h5>Tags Seleccionados:</h5>
        <div className="selected-tags">
          {selectedTags.map((tag) => (
            <button
              key={tag}
			  type="button"
              className="custom-button btn btn-primary mt-2 me-2"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TagSelection;
