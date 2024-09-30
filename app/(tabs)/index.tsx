import FavoritePokemonList from '@/routes/FavoritePokemonList'
import { PokemonDetailsScreen } from '@/routes/PokemonDetailsScreen'
import PokemonList from '@/routes/PokemonList'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from  '@react-navigation/stack'

export default function HomeScreen() {
  const Drawer = createDrawerNavigator()
  return (
      <Drawer.Navigator>
        <Drawer.Screen name='Home' component={MainStackNavigator}/>
        <Drawer.Screen name='Favorites' component={FavoritePokemonNavigator} />
      </Drawer.Navigator>
  )
}

const MainStackNavigator = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='Pokémons'
        component={PokemonList}
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name='Pokemon details'
        component={PokemonDetailsScreen}
        options={({ route }) =>
          ({
            title: route?.params?.name || '',
            headerShown: false
          })
        }
      />
    </Stack.Navigator>
  )
}

const FavoritePokemonNavigator = () => {
  const Stack = createDrawerNavigator()
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='FavoritePokemonList' 
        component={FavoritePokemonList}
        options={{
          headerShown: false,
          unmountOnBlur: true
        }}
      />
      <Stack.Screen
        name='Pokemon details'
        component={PokemonDetailsScreen}
        options={({ route }) =>
          ({
            headerShown: false
          })
        }
      />
    </Stack.Navigator>
  )
}