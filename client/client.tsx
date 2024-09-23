import axios, { AxiosResponse } from "axios";
import { PokemonResponse } from "@/models/pokemon.interface";
import { PokemonDetails } from "@/models/pokemonDetails.interface";

const baseURL = 'https://pokeapi.co/api/v2'

const client = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (path: string) => client.get(path).then(responseBody)
}

export const PokemonClient = {
    getPokemons: (next?: string): Promise<PokemonResponse> => {
        if (next) 
            {
                next = next.replace(`${baseURL}/pokemon`, '')
                return requests.get(`pokemon/${next}`)
            } 
        else 
            { return requests.get(`pokemon`) }
    },
    getAPokemon: (nameOrNumber: string): Promise<PokemonDetails> => requests.get(`pokemon/${nameOrNumber}`)
}