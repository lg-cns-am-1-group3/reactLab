import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './NotFound';
import Navbar from './layouts/Navbar';
import Home from './Home';
import University from './components/University/University';
import TVMaze from './components/TVMaze/TVMaze';
import NameInsight from './components/Genderize/NameInsight';
import LibreTranslate from './components/LibreTranslate/LibreTranslate';
import NewsListHanjin from './components/NewsListHanjin/NewsListHanjin';
import NewsListYebin from './components/NewsListYebin/NewsListYebin';
import Random from './components/Random/Random';
import PokemonList from './components/PokemonPokeShy/PokemonList';
import PokemonDetail from './components/PokemonPokeShy/PokemonDetail';
import PokemonsOh from './components/PokemonOhhyungsuh/Pokemons';
import PokemonInfoOh from './components/PokemonOhhyungsuh/PokemonInfo';
import DogBreed from './components/DogBreed/DogBreed';
import HarryPotter from './components/HarryPotter/HarryPotter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/pokemon-ohhyungsuh', element: <PokemonsOh /> },
      { path: '/pokemon-ohhyungsuh/:pokemonName', element: <PokemonInfoOh /> },
      { path: '/university', element: <University /> },
      { path: '/tvmaze', element: <TVMaze /> },
      { path: '/pokemon-poke-shy', element: <PokemonList /> },
      { path: '/pokemon-poke-shy/:name', element: <PokemonDetail /> },
      { path: '/genderize', element: <NameInsight /> },
      { path: '/newslist-hanjin', element: <NewsListHanjin /> },
      { path: '/libretranslate', element: <LibreTranslate /> },
      { path: '/dogbreed', element: <DogBreed /> },
      { path: '/random', element: <Random /> },
      { path: '/newslist-yebin', element: <NewsListYebin /> },
      { path: '/harrypotter', element: <HarryPotter /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
