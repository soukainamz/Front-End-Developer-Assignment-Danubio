import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CharacterGrid = () => {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 

  
  const fetchCharacters = (searchTerm = '', page = 1) => {
    setLoading(true);
    axios
      .get(`https://rickandmortyapi.com/api/character/?name=${searchTerm}&page=${page}`)
      .then((response) => {
        setCharacters(response.data.results.slice(0, 10));
        setTotalPages(Math.ceil(response.data.info.count / 10)); 
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching characters: ', error);
        setCharacters([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchClick = () => {
    setCurrentPage(1); 
    fetchCharacters(search, 1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchCharacters(search, newPage);
  };

  const getStatus = (status) => {
    switch (status) {
      case 'Alive':
        return { color: 'green', text: 'Alive' };
      case 'Dead':
        return { color: 'red', text: 'Dead' };
      case 'unknown':
        return { color: 'gray', text: 'Unknown' };
      default:
        return { color: 'gray', text: 'Unknown' };
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search for characters..."
          className="search-input"
        />
        <button onClick={handleSearchClick} className="search-button">Search</button>
      </div>
      <div className="character-grid">
        {characters.map((character) => {
          const { color, text } = getStatus(character.status);
          return (
            <div className="character-card" key={character.id}>
              <Link to={`/character/${character.id}`} className="card-link">
                <div
                  className="status-indicator"
                  style={{ backgroundColor: color }}
                >
                  {text}
                </div>
                <img src={character.image} alt={character.name} />
                <h3>{character.name}</h3>
                <p>{character.location.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterGrid;
