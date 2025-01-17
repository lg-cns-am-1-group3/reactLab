import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PokemonInfo.css"

export default function PokemonInfo() {
    const endpoint = `https://pokeapi.co/api/v2/pokemon/`;
    const { pokemonName } = useParams();
    
    const [pokemon, setPokemon] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${endpoint}${pokemonName}`)
            .then(res => {
                setPokemon(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="pokemon-info">
            {
                isLoading ? (
                    <h1>데이터를 가져오고 있습니다</h1>
                ) : pokemon ? (
                    <>
                        <h2>{pokemon.name}</h2>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <div>
                            <h3>타입:</h3>
                            <ul>
                                {pokemon.types.map(type => (
                                    <li key={type.type.name}>{type.type.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3>능력치:</h3>
                            <ul>
                                {pokemon.stats.map(stat => (
                                    <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
                                ))}
                            </ul>
                        </div>
                    </>
                ) : (
                    <h1>포켓몬 정보를 불러오는 데 실패했습니다.</h1>
                )
            }
        </div>
    );
}
