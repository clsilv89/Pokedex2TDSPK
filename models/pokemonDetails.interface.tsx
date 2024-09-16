export interface PokemonDetails {
    name: string,
    height: number,
    weight: number,
    sprites: Sprites
}

interface Sprites {
    front_default: string,
    back_default?: string,
    front_female?: string,
    back_female?: string
}