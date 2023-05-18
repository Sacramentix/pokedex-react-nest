import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

describe('PokemonController', () => {
  let appController: PokemonController;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [PokemonService],
    }).compile();

    appController = app.get(PokemonController);
  });

  describe('root', () => {

  });
});
