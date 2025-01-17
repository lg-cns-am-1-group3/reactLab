import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HarryPotterList from './HarryPotterList';
import './HarryPotter.css';

function HarryPotter() {
  const [characters, setCharacters] = useState([]);
  const [view, setView] = useState('characters');

  useEffect(() => {
    axios
      .get('https://hp-api.onrender.com/api/characters')
      .then((response) => setCharacters(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleToggle = (newView) => {
    setView(newView);
  };

  return (
    <div className="hp-character-page">
      <h1>Harry Potter API Viewer</h1>
      <div className="toggle-buttons">
        <button
          onClick={() => handleToggle('characters')}
          className={view === 'characters' ? 'active' : ''}
        >
          Characters
        </button>
        <button
          onClick={() => handleToggle('apiInfo')}
          className={view === 'apiInfo' ? 'active' : ''}
        >
          API Info
        </button>
      </div>

      {view === 'characters' ? (
        <HarryPotterList characters={characters} />
      ) : (
        <div className="api-info">
          <h2>Harry Potter API</h2>
          <p>
            The API provides information about Harry Potter characters. You can find the API
            documentation at{' '}
            <a href="https://hp-api.herokuapp.com/" target="_blank" rel="noopener noreferrer">
              https://hp-api.herokuapp.com/
            </a>
            .
          </p>
          <h3>Request</h3>
          <pre>{`GET /api/characters`}</pre>
          <h3>Sample Response</h3>
          <pre>{`
[
  {
    "id": "9e3f7ce4-b9a7-4244-b709-dae5c1f1d4a8",
    "name": "Harry Potter",
    "alternate_names": ["The Boy Who Lived", "The Chosen One", "Undesirable No. 1", "Potty"],
    "species": "human",
    "gender": "male",
    "house": "Gryffindor",
    "dateOfBirth": "31-07-1980",
    "yearOfBirth": 1980,
    "wizard": true,
    "ancestry": "half-blood",
    "eyeColour": "green",
    "hairColour": "black",
    "wand": {
      "wood": "holly",
      "core": "phoenix tail feather",
      "length": 11
    },
    "patronus": "stag",
    "hogwartsStudent": true,
    "hogwartsStaff": false,
    "actor": "Daniel Radcliffe",
    "alternate_actors": [],
    "alive": true,
    "image": "https://ik.imagekit.io/hpapi/harry.jpg"
  }
]
`}</pre>
        </div>
      )}
    </div>
  );
}

export default HarryPotter;
