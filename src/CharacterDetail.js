import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CharacterDetail = () => {
  const { id } = useParams();  
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => {
        setCharacter(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching character details: ", error);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Alive':
        return '#4CAF50';  
      case 'Dead':
        return '#F44336';  
      case 'unknown':
        return '#9E9E9E';  
      default:
        return '#9E9E9E';  
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!character) {
    return <p>Character not found!</p>;
  }

  return (
    <div className="character-detail">
      <div className="detail-card">
        { }
        <div className="corner" style={{ backgroundColor: getStatusColor(character.status) }}></div>

        <h2>{character.name}</h2>
        <img src={character.image} alt={character.name} />
        <div className="details">
          <p><strong>Status:</strong> {character.status}</p>
          <p><strong>Species:</strong> {character.species}</p>
          <p><strong>Gender:</strong> {character.gender}</p>
          <p><strong>Origin:</strong> {character.origin.name}</p>
          <p><strong>Location:</strong> {character.location.name}</p>
          <p><strong>First Seen in:</strong> {formatDate(character.created)}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
