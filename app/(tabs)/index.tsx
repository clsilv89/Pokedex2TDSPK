import { PokemonDetailsScreen } from '@/routes/PokemonDetailsScreen'
import PokemonList from '@/routes/PokemonList'
import { createStackNavigator } from  '@react-navigation/stack'

export default function HomeScreen() {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='Pokémons'
        component={PokemonList}
      />
      <Stack.Screen 
        name='Pokemon details'
        component={PokemonDetailsScreen}
        options={({ route }) =>
          ({
            title: route?.params?.name || ''
          })
        }
      />
    </Stack.Navigator>
  )
}
