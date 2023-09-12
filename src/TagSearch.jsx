import React, { useState } from 'react';
import { Dropdown, FormControl, Button } from 'react-bootstrap';

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
    <div>
      <Dropdown show={showDropdown} onToggle={() => setShowDropdown(!showDropdown)}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Tags
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ minWidth: '200px' }}>
          <FormControl
            type="text"
            placeholder="Buscar Tags"
            className="m-2"
            value={searchText}
            onChange={handleSearchChange}
          />
          {filteredTags.map((tag) => (
            <div key={tag} className="m-2">
              <Button
                variant={selectedTags.includes(tag) ? 'primary' : 'outline-primary'}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Button>
            </div>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <div className="mt-4">
        <h5>Tags Seleccionados:</h5>
        <div className="selected-tags">
          {selectedTags.map((tag) => (
            <Button
              key={tag}
              variant="primary"
              className="me-2 mb-2"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TagSelection;
