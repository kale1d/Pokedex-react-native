export interface PokemonData {
  pokemons: Pokemon;
  url: string;
}

export interface Pokemon {
  name: string;
  imageUri: string;
  url: string;
}