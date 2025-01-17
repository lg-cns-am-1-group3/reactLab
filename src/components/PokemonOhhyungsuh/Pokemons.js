import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Pokemons.css"

export default function Pokemons() {
    const endpoint = `https://pokeapi.co/api/v2/pokemon/`;
    
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [pokemonName, setPokemonName] = useState("");

    useEffect(() => {
        axios.get(`${endpoint}?limit=100`)
            .then(res => {
                setPokemons(res.data.results);
                setFilteredPokemons(res.data.results);
            })
            .catch(err => console.log(err));
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setPokemonName(value);

        if (value.trim() === "") {
            setFilteredPokemons(pokemons);
        } else {
            const filtered = pokemons.filter(pokemon =>
                pokemon.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredPokemons(filtered);
        }
    };
    
    return (
        <div className="container">
            <h1>포켓몬 찾기</h1>
            <div className="search">
                <input className="pokemon-input" type="text" value={pokemonName} onChange={handleInputChange} placeholder="이름을 입력하세요!" />
            </div>
            { filteredPokemons.length === 0 && <div>일치하는 포켓몬이 없습니다.</div> }
            {
                <div className="list">
                    {filteredPokemons.map(pokemon => (
                        <div key={pokemon.name} className="info">
                            <p>{pokemon.name}</p>
                            <Link to={`/pokemon-ohhyungsuh/${pokemon.name}`}>자세히 보기</Link>
                        </div>
                    ))}
                </div> 
            }
        </div>
    );
}
