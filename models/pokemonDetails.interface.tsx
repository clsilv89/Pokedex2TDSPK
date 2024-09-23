export interface PokemonDetails {
    name: string,
    height: number,
    weight: number,
    order: number,
    sprites: Sprites,
    stats: Stats[],
    types: Types[]
}

interface Sprites {
    front_default: string,
    back_default?: string,
    front_female?: string,
    back_female?: string
}

interface Stats {
    base_stat: number,
    effort: number,
    stat: Stat
}

interface Stat {
    name: string,
    url: string
}

interface Types {
    slot: number,
    type: Type
}

interface Type {
    name: PokemonType,
    url: string
}

export enum PokemonType {
    Normal =  "normal",
    Fighting = "fighting",
    Flying = "flying",
    Poison = "poison",
    Ground = "ground",
    Rock = "rock",
    Bug = "bug",
    Ghost = "ghost",
    Steel = "steel",
    Fire = "fire",
    Water = "water",
    Grass = "grass",
    Electric = "electric",
    Psychic = "psychic",
    Ice = "ice",
    Dragon = "dragon",
    Dark = "dark",
    Fairy = "fairy",
    Stellar = "stellar",
    Unknown = "unknown",
}