import axios, { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pokemon, PokemonResponse } from "@/models/pokemon.interface";
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
    getAPokemon: (nameOrNumber: string): Promise<PokemonDetails> => requests.get(`pokemon/${nameOrNumber}`),
    savePokemonLocal: (pokemon: Pokemon): Promise<void> => {
        return AsyncStorage.setItem(`@pokemon:${pokemon.url}`, JSON.stringify(pokemon))
    },
    removePokemonLocal: (pokemon: Pokemon): Promise<void> => {
        console.log(pokemon.url)
        return AsyncStorage.removeItem(`@pokemon:${pokemon.url}`)
    },
    getPokemonLocal: async(): Promise<Pokemon[]> => {
        const keys = await AsyncStorage.getAllKeys()
        const fetchedKeys = keys.filter((k) => { return k.startsWith('@pokemon:')})
        const result = await AsyncStorage.multiGet(fetchedKeys)

        return result.map((r) => {
            return JSON.parse(r[1]) as Pokemon
        })
    }
}