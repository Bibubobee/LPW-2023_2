import React, { useState } from 'react';
import './TagSearch.css';

function TagSelection() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const allTags = ['Etiqueta 1', 'Etiqueta 2', 'Etiqueta 3', 'Etiqueta 4', 'Etiqueta 5'];

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

  const filteredTags = allTags.filter((tag) =>
    tag.toLowerCase().includes(searchText.toLowerCase())
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
          Tags
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
            <li key={tag} className="text-center">
              <button
                className={`btn custom-button ${selectedTags.includes(tag) ? 'btn-primary' : 'btn-outline-primary'} px-5 mt-2`}
                onClick={() => handleTagClick(tag)}
				type="button"
              >
                {tag}
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
