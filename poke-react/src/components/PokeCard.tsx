import type { Pokemon } from '../../../types/pokemon'
import './PokeCard.scss'

function PokeCard(pokemon:Pokemon) {

  return (
    <div className='poke-card'>
      <h2>{pokemon.name}</h2>
      <div>
        <p>{pokemon.generation}</p>
        <p>habitat: {pokemon.habitat}</p>
        <p>forme: {pokemon.shape}</p>
        <p>couleur: {pokemon.color}</p>
      </div>
      <p>{pokemon.flavor}</p>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt="The pokemon sprite" />
    </div>
  )
}

export default PokeCard;
