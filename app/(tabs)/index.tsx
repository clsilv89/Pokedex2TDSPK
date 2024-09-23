import { Image, StyleSheet, Text, ScrollView, Button, View, TextInput, TouchableHighlight, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { PokemonClient } from '@/client/client';
import { PokemonResponse } from '@/models/pokemon.interface';
import { PokemonDetails } from '@/models/pokemonDetails.interface';
import { Pokemon } from '@/models/pokemon.interface';
import { PokemonComponent } from '@/components/PokemonComponent';
import { BarChart } from "react-native-chart-kit";

export default function HomeScreen() {
  const [pokemonList, setPokemonList] = useState<Array<Pokemon>>([])
  const [next, setNext] = useState('')
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>()
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

  async function getAPokemon(pokemon: string) {
    const response = await PokemonClient.getAPokemon(pokemon)
    setPokemonDetails(response)
  }

  async function clear() {
    setPokemonDetails(undefined)
    fetchPokemons()
  }

  function pokemonDetailsView(pokemonDetails: PokemonDetails) {
    const labels = [""]
    const dataset = [0]
    
    pokemonDetails.stats.forEach(stat => {
      labels.push(stat.stat.name)
      dataset.push(stat.base_stat)
    })
    const data = {
      labels: labels,
      datasets: [
        {
          data: dataset
        }
      ]
    }
    return (
      <View style={styles.detailsContainer}>
        <Image style={styles.imageContainer} source={{uri: pokemonDetails.sprites.front_default}}/>
        <Text>{pokemonDetails.name}</Text>
        <Text>{pokemonDetails.height}</Text>
        <Text>{pokemonDetails.weight}</Text>
        <BarChart
          style={styles.chartStyle}
          data={data}
          width={Dimensions.get('window').width}
          height={Dimensions.get('window').height / 2}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          />      
        </View>    
      )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput 
          placeholder='Nome ou Numero do Pokemon'
          onChangeText={(text) => {setPokemonName(text)}}
          />
        <Button title="Pesquisar" onPress={() => getAPokemon(pokemonName)} />
        <Button title="Limpar" onPress={() => clear()} />
      </View>
      {
        pokemonDetails ? pokemonDetailsView(pokemonDetails) :
        <FlatList 
          style={styles.scrollContainer}
          data={pokemonList}
          renderItem={
            ((pokemonDetails) => {
                return (
                  <>
                    <TouchableHighlight onPress={() => getAPokemon(pokemonDetails.item.name)}>
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

const chartConfig = {
  backgroundGradientFrom: "#08130D",
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(100, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false
};

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
  },
  detailsContainer: { 
    alignItems: 'center'
  },
  imageContainer: {
    height: 120,
    width: 120
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16
  }
});
