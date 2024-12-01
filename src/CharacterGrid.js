import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CharacterGrid = () => {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch characters from the API
  const fetchCharacters = (searchTerm = '') => {
    setLoading(true);
    axios
      .get(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`)
      .then((response) => {
        setCharacters(response.data.results.slice(0, 10)); // Ensure only 10 characters are displayed
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching characters: ", error);
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
    fetchCharacters(search);
  };

  // Determine the status color and text based on character's status
  const getStatus = (status) => {
    switch (status) {
      case 'Alive':
        return { color: 'green', text: 'Alive' };
      case 'Dead':
        return { color: 'red', text: 'Dead' };
      case 'unknown':
        return { color: 'gray', text: 'Unknown' };
      default:
        return { color: 'gray', text: 'Unknown' }; // Default case if status is unknown
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
          const { color, text } = getStatus(character.status); // Get status color and text
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
                {/* <p>Status: {character.status}</p> */}
                {/* <p>Last Known Location: {character.location.name}</p> */}
                <p>{character.location.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterGrid;
