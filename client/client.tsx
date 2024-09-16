import axios, { AxiosResponse } from "axios";
import { PokemonResponse } from "@/models/pokemon.interface";
import { PokemonDetails } from "@/models/pokemonDetails.interface";

const client = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
    headers: {
        'Content-Type': 'application/json'
    }
})

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (path: string) => client.get(path).then(responseBody)
}

export const PokemonClient = {
    getPokemons: (): Promise<PokemonResponse> => requests.get(`pokemon`),
    getAPokemon: (nameOrNumber: string): Promise<PokemonDetails> => requests.get(`pokemon/${nameOrNumber}`)
}