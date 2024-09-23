import { Image, StyleSheet, Button, View, TextInput, TouchableHighlight, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { PokemonClient } from '@/client/client';
import { Pokemon } from '@/models/pokemon.interface';
import { PokemonComponent } from '@/components/PokemonComponent';

export default function PokemonList({navigation}) {
  const [pokemonList, setPokemonList] = useState<Array<Pokemon>>([])
  const [next, setNext] = useState('')
  const [pokemonName, setPokemonName] = useState('')

  useEffect(() => {
    fetchPokemons()
  }, [])

  async function fetchPokemons(path?: string) {
    const response = await PokemonClient.getPokemons(path)
    setPokemonList(pokemonList => [...pokemonList, ...response.results])
    console.log(response.next)
    setNext(response.next ?? '')
  }

  async function clear() {
    fetchPokemons()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput 
          placeholder='Nome ou Numero do Pokemon'
          onChangeText={(text) => {setPokemonName(text)}}
          />
        <Button title="Pesquisar" onPress={() => 
                {
                    if (pokemonName.length == 0) 
                    { return }
                else {
                    navigation.navigate('Pokemon details', {name: pokemonName})
                }
            }
        } />
        <Button title="Limpar" onPress={() => clear()} />
      </View>
      {
        <FlatList 
          style={styles.scrollContainer}
          data={pokemonList}
          renderItem={
            ((pokemonDetails) => {
                return (
                  <>
                    <TouchableHighlight onPress={() =>
                            navigation.navigate('Pokemon details', {name: pokemonDetails.item.name})
                        }>
                      <PokemonComponent {...pokemonDetails.item} />
                    </TouchableHighlight>
                  </>
                )
              }
            )
          }
          onEndReached={() => fetchPokemons(next)}
        />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    flex: 10
  },
  searchContainer: {
    width: Dimensions.get('window').width,
    margin: 12,
    height:56,
    flexDirection: 'row'
  }
});
