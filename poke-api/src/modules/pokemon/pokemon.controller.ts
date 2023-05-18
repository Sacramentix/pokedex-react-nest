import { Controller, Get, Param, Req } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get("sus")
  sus() {
    return "sus";
  }
  @Get('/random/:quantity')
  getRandomPokemons(@Param("quantity") quantity:string) {
    return this.pokemonService.getRandomPokemons(parseInt(quantity));
  }
}
