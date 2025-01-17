import React from 'react';
import HarryPotterCard from './HarryPotterCard';
import './HarryPotterList.css';

function HarryPotterList({ characters }) {
  return (
    <div className="hp-character-list">
      {characters.map(character => (
        <HarryPotterCard key={character.name} character={character} />
      ))}
    </div>
  );
}

export default HarryPotterList;