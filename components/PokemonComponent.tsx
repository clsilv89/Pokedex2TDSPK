import { PokemonDetails } from "@/models/pokemonDetails.interface";
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, Dimensions } from "react-native";
import { PokemonClient } from '@/client/client';
import { Pokemon } from "@/models/pokemon.interface";

export function PokemonComponent(props: Pokemon) {

  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>()

  useEffect(() => {
    fetchDetails()
  }, [])

  async function fetchDetails() {
    const response = await PokemonClient.getAPokemon(props.name)
    setPokemonDetails(response)
  }

    return (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text>#{pokemonDetails?.order} </Text>
            <Text>{pokemonDetails?.name}</Text>
          </View>
          <View style={styles.imageContainer}>
            <ImageBackground style={styles.image} resizeMode="cover" source={require('../assets/images/pokeball-bg.png')}>
              <Image style={styles.image} source={{uri: pokemonDetails?.sprites.front_default}}/>
            </ImageBackground>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width, 
    flexDirection: 'row',
    flex: 1,
    margin: 16,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    verticalAlign: 'middle'
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  imageBackground: {
    height: 50,
    width: 50,
    padding: 40,
    flex: 2,
  },
  image: {
    height: 150,
    width: 150,
    justifyContent: 'center'
  }
})