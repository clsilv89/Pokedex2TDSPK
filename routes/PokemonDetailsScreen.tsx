import {View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import { BarChart } from 'react-native-chart-kit'
import React, { useState, useEffect } from 'react';
import { PokemonClient } from '@/client/client';
import { PokemonDetails } from '@/models/pokemonDetails.interface';
import { PokemonDetailsComponent } from '@/components/PokemonDetailsComponent';

export function PokemonDetailsScreen({
    route: {
        params: {
            name = '',
        }
    }
}) {
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>()

    useEffect(() => {
        getAPokemon(name)
    }, [])

    async function getAPokemon(pokemon: string) {
        const response = await PokemonClient.getAPokemon(pokemon)
        setPokemonDetails(response)
    }

    
    return (
        <View style={styles.detailsContainer}>
            {
                pokemonDetails && <PokemonDetailsComponent {...pokemonDetails}/>
            }
        </View>    
    )
}

const styles = StyleSheet.create({
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
    },
    typePill: {
        margin: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#babaca',
        borderRadius: 50
    }
})

const chartConfig = {
    backgroundGradientFrom: "#08130D",
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(100, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
};