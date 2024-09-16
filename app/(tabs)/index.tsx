import { Image, StyleSheet, Text, ScrollView, Button, View, TextInput, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { PokemonClient } from '@/client/client';
import { PokemonResponse } from '@/models/pokemon.interface';
import { PokemonDetails } from '@/models/pokemonDetails.interface';

export default function HomeScreen() {
  const [pokemonList, setPokemonList] = useState<PokemonResponse>()
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>()
  const [pokemonName, setPokemonName] = useState('')

  useEffect(() => {
    fetchPokemons()
  }, [])

  async function fetchPokemons() {
    const response = await PokemonClient.getPokemons()
    setPokemonList(response)
  }

  async function getAPokemon(pokemon: string) {
    const response = await PokemonClient.getAPokemon(pokemon)
    setPokemonDetails(response)
  }

  async function clear() {
    setPokemonDetails(undefined)
    fetchPokemons()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput 
          placeholder='Nome ou Numero do Pokemon'
          onChangeText={(text) => {setPokemonName(text)}}
          />
        <Button title="Pesquisar" onPress={() => getAPokemon(pokemonName)} />
        {/* <Button title="Limpar" onPress={() => clear()} /> */}
      </View>
      {
        pokemonDetails ? 
        <View style={styles.detailsContainer}>
          <Image style={styles.imageContainer} source={{uri: pokemonDetails.sprites.front_default}}/>
          <Text>{pokemonDetails.name}</Text>
          <Text>{pokemonDetails.height}</Text>
          <Text>{pokemonDetails.weight}</Text>
        </View> :
        <ScrollView style={styles.scrollContainer}>
        {
          pokemonList?.results.map((pokemon) => {
            return (
              <TouchableHighlight onPress={() => getAPokemon(pokemon.name)}>
                <Text style={{marginVertical: 12}}>{pokemon.name}</Text>
              </TouchableHighlight>
            )
          })
        }
      </ScrollView>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    margin: 12
  },
  searchContainer: {
    margin: 12,
    flexDirection: 'row'
  },
  detailsContainer: { 
    alignItems: 'center'
  },
  imageContainer: {
    height: 120,
    width: 120
  }
});
