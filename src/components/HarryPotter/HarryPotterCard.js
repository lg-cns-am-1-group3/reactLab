import React from 'react';
import './HarryPotterCard.css';

function HarryPotterCard({ character }) {
  return (
    <div className="hp-character-card">
      <div className="hp-character-card-header">
        <h2>{character.name}</h2>
        {character.image && <img src={character.image} alt={character.name} />}
      </div>
      <div className="hp-character-card-body">
        <p>
          <strong>Alternate Names:</strong> {character.alternate_names.join(', ') || 'None'}
        </p>
        <p>
          <strong>Species:</strong> {character.species}
        </p>
        <p>
          <strong>Gender:</strong> {character.gender}
        </p>
        <p>
          <strong>House:</strong> {character.house || 'Unknown'}
        </p>
        <p>
          <strong>Date of Birth:</strong> {character.dateOfBirth}
        </p>
        <p>
          <strong>Year of Birth:</strong> {character.yearOfBirth}
        </p>
        <p>
          <strong>Wizard:</strong> {character.wizard ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Ancestry:</strong> {character.ancestry || 'Unknown'}
        </p>
        <p>
          <strong>Eye Colour:</strong> {character.eyeColour}
        </p>
        <p>
          <strong>Hair Colour:</strong> {character.hairColour}
        </p>
        {character.wand && (
          <p>
            <strong>Wand:</strong> {character.wand.wood}, {character.wand.core},{' '}
            {character.wand.length} inches
          </p>
        )}
        <p>
          <strong>Patronus:</strong> {character.patronus || 'Unknown'}
        </p>
        <p>
          <strong>Hogwarts Student:</strong> {character.hogwartsStudent ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Hogwarts Staff:</strong> {character.hogwartsStaff ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Actor:</strong> {character.actor}
        </p>
        <p>
          <strong>Alive:</strong> {character.alive ? 'Yes' : 'No'}
        </p>
      </div>
    </div>
  );
}

export default HarryPotterCard;
