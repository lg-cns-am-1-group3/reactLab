import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PokemonDetail.css'; // CSS 파일 가져오기

function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => {
        console.log(response.data);
        setPokemon(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching Pokemon detail: ', error);
        setPokemon(null);
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!pokemon) {
    return <p>Pokemon not found</p>;
  }

  return (
    <div className="pokemon-container">
      <h1>Pokemon Detail</h1>
      <img src={pokemon.sprites?.front_default} alt={pokemon.name} className="pokemon-image" />
      <div className="pokemon-detail">
        <p>
          <strong>height : </strong> {pokemon.height}
        </p>
        <p>
          <strong>weight : </strong> {pokemon.weight}
        </p>
        <p>
          <strong>ability : </strong>
        </p>
        <ul>
          {pokemon.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PokemonDetail;
