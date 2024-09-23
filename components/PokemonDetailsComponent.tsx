import { PokemonDetails, PokemonType } from "@/models/pokemonDetails.interface";
import {View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import { BarChart } from 'react-native-chart-kit'

export function PokemonDetailsComponent(props: PokemonDetails) {

    const labels = Array<string>()
    const dataset = Array<number>()

    let style = [styles.detailsContainer]

    switch (props.types[0].type.name) {
        case PokemonType.Bug:
            style.push(styles.bug)
            break
        case PokemonType.Dark:
            style.push(styles.dark)
            break
        case PokemonType.Dragon:
            style.push(styles.dragon)
            break
        case PokemonType.Electric:
            style.push(styles.electric)
            break
        case PokemonType.Fairy:
            style.push(styles.fairy)
            break
        case PokemonType.Fighting:
            style.push(styles.fighting)
            break
        case PokemonType.Fire:
            style.push(styles.fire)
            break
        case PokemonType.Flying:
            style.push(styles.flying)
            break
        case PokemonType.Ghost:
            style.push(styles.ghost)
            break
        case PokemonType.Grass:
            style.push(styles.grass)
            break
        case PokemonType.Ground:
            style.push(styles.ground)
            break
        case PokemonType.Ice:
            style.push(styles.ice)
            break
        case PokemonType.Normal:
            style.push(styles.normal)
            break
        case PokemonType.Poison:
            style.push(styles.poison)
            break
        case PokemonType.Psychic:
            style.push(styles.psychic)
            break
        case PokemonType.Rock:
            style.push(styles.rock)
            break
        case PokemonType.Steel:
            style.push(styles.steel)
            break
        case PokemonType.Stellar:
            style.push(styles.stellar)
            break
        case PokemonType.Water:
            style.push(styles.water)
            break
        case PokemonType.Unknown:
            style.push(styles.unknown)
            break
        default:
            console.log('Esse é padrão')
    }
    
    props?.stats.forEach(stat => {
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
        <View style={style}>
            <View style={{flexDirection: 'row'}}>
                {
                    props?.types?.map((type) => {
                        return (
                            <Text style={styles.typePill}>{type.type.name}</Text>
                        )
                    })
                }
            </View>
            <Image style={styles.imageContainer} source={{uri: props?.sprites?.front_default}}/>
            <Text>{props?.name}</Text>
            <Text>{props?.height}</Text>
            <Text>{props?.weight}</Text>
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

const styles = StyleSheet.create({
    detailsContainer: {
        flexWrap: 'nowrap',
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
    },
    normal: { backgroundColor: '#A8A77A'},
    fire: { backgroundColor: '#EE8130'},
    water: { backgroundColor: '#6390F0'},
    electric: { backgroundColor: '#F7D02C'},
    grass: { backgroundColor: '#7AC74C'},
    ground: { backgroundColor: '#d8b900'},
    ice: { backgroundColor: '#96D9D6'},
    fighting: { backgroundColor: '#C22E28'},
    poison: { backgroundColor: '#A33EA1'},
    flying: { backgroundColor: '#A98FF3'},
    psychic: { backgroundColor: '#F95587'},
    bug: { backgroundColor: '#A6B91A'},
    rock: { backgroundColor: '#B6A136'},
    ghost: { backgroundColor: '#735797'},
    dragon: { backgroundColor: '#6F35FC'},
    dark: { backgroundColor: '#705746'},
    steel: { backgroundColor: '#B7B7CE'},
    fairy: { backgroundColor: '#D685AD'},
    stellar: { backgroundColor: '#96ffD6'},
    unknown: { backgroundColor: '#6F3599'}
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