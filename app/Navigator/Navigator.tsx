import React from 'react';
import {PokemonList} from '../components/PokeList/PokeList';
import {PokeDetail} from '../components/PokeDetail/PokeDetail';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

type RootStackParamList = {
  PokeList: undefined;
  PokemonDetails: {url: string};
};

const Stack = createStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PokeList">
        <Stack.Screen
          name="PokeList"
          component={PokemonList}
          options={{
            title: 'Pokedex',
            headerStyle: {
              backgroundColor: '#F2C3BA',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'Recursive',
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="PokemonDetails"
          component={PokeDetail}
          options={{
            title: 'Details',
            headerStyle: {
              backgroundColor: '#F2C3BA',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'Recursive',
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
