import { Injectable } from "@nestjs/common";
import { GraphQLClient, gql } from "graphql-request";
// import type { Pokemon } from "../../../../types/pokemon";

@Injectable()
export class PokemonService {
  gqlClient:GraphQLClient;
  pokemonQuantity = 1008
  constructor() {
    this.gqlClient = new GraphQLClient("https://beta.pokeapi.co/graphql/v1beta")
  }

  async getRandomPokemons(quantity = 20, lang = "fr") {

    const randomOffset = Math.floor(Math.random() * (this.pokemonQuantity - quantity - 0 + 1) + 0);

    const result = await this.gqlClient.request<PokemonsGraphRaw>(gql`{
      pokemons: pokemon_v2_pokemonspecies(offset: ${randomOffset}, limit: ${quantity}, distinct_on: id) {
        generation: pokemon_v2_generation {
          is: pokemon_v2_generationnames(where: {pokemon_v2_language: {name: {_eq: "${lang}"}}}) {
            name
          }
        }
        habitat: pokemon_v2_pokemonhabitat {
          is: pokemon_v2_pokemonhabitatnames(where: {pokemon_v2_language: {name: {_eq: "${lang}"}}}) {
            name
          }
        }
        shape: pokemon_v2_pokemonshape {
          is: pokemon_v2_pokemonshapenames(where: {pokemon_v2_language: {name: {_eq: "${lang}"}}}) {
            name
          }
        }
        color: pokemon_v2_pokemoncolor {
          is: pokemon_v2_pokemoncolornames(where: {pokemon_v2_language: {name: {_eq: "${lang}"}}}) {
            name
          }
        }
        name: pokemon_v2_pokemonspeciesnames(where: {pokemon_v2_language: {name: {_eq: "${lang}"}}}) {
          name
        }
        flavor: pokemon_v2_pokemonspeciesflavortexts(where: {pokemon_v2_language: {name: {_eq: "${lang}"}}}, limit: 1) {
          text: flavor_text
        }
        id
      }
    }`).catch<PokeGraphError>(()=>({error: "Rate limit reached"}));
    if (!('error' in result)) {
      const pokemons = result.pokemons.map(pokemon=>({
        generation: pokemon?.generation?.is[0]?.name,
        habitat: pokemon?.habitat?.is[0]?.name,
        shape: pokemon?.shape?.is[0]?.name,
        color: pokemon?.color?.is[0]?.name,
        name: pokemon?.name[0]?.name,
        flavor: pokemon?.flavor[0]?.text.replace("\n"," "),
        id: pokemon.id
      }))
      return pokemons;
    }
    return result;
    
  }
}

type PokemonsGraphRaw = {
  pokemons: {
      generation: {
          is: {
              name: string;
          }[];
      };
      habitat: {
        is: {
            name: string;
        }[];
    };
      shape: {
          is: {
              name: string;
          }[];
      };
      color: {
          is: {
              name: string;
          }[];
      };
      name: {
          name: string;
      }[];
      flavor: {
          text: string;
      }[];
      id:number
  }[];
}

type PokeGraphError = {
  error: string
}

