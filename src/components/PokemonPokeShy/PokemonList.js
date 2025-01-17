import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PokemonList.css'; // CSS 파일 가져오기

function PokemonList() {
  const [PokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=200')
      .then((response) => {
        setPokemonList(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching Pokemon data: ', error);
      });
  }, []);

  // 검색어를 기준으로 Pokemon 목록 필터링
  const filteredPokemonList = PokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pokemon-list-container">
      <h1>Pokemon List</h1>

      {/* 검색 입력 필드 */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search Pokemon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // 검색어 업데이트
      />

      <div className="scroll-box">
        <ul className="pokemon-list">
          {filteredPokemonList.map((pokemon) => (
            <li key={pokemon.name} className="pokemon-item">
              <Link to={`/pokemon-poke-shy/${pokemon.name}`}>{pokemon.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PokemonList;
