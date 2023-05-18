import './App.scss'
import PokeCard from './components/PokeCard';
import { usePokeApi } from './composables/usePokeApi'

function App() {
  const { pokemons, getRandomPokemons } = usePokeApi();

  return (
    <main>
      <h1>Pokedex</h1>
      {pokemons.loading && <div className='loader'></div>}
      <section>
        { pokemons.data.map(pokemon=>
          <PokeCard  {...pokemon}/>
        )}
      </section>
    </main>
  )
}

export default App
