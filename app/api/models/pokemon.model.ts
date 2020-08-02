export interface PokemonData {
  pokemons: Pokemon;
  url: string;
}

export interface Pokemon {
  name: string;
  imageUri: string;
  url: string;
}

export interface PokemonDetails {
  name: string;
  imageUri: string;
  types: Type[];
  abilities: Ability[];
}

interface Type {
  slot: number;
  type: GeneralData
}

interface Ability {
  ability: GeneralData;
  is_hidden: boolean;
  slot: number;
}

interface GeneralData {
  name: string;
  url: string;
}