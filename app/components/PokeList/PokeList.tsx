import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {Card} from '../Card/Card';
import {Pokemon} from '../../api/models/pokemon.model';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {
  navigation: any;
};
export const PokemonList: React.FC<Props> = ({navigation}) => {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [result, setResult] = useState([]);

  const [loading, setLoading] = useState(false);
  const arr: Pokemon[] = [];

  useEffect(() => {
    setLoading(true);
    getPokemons();
    setLoading(false);
  }, []);

  const getPokemons = async () => {
    try {
      axios
        .get('https://pokeapi.co/api/v2/pokemon/?limit=50')
        .then((response) => {
          response.data.results.map(async (item: any) => {
            return axios
              .get(item.url)
              .then((res) => {
                arr.push({
                  name: res.data.name,
                  imageUri: res.data.sprites.front_default,
                  url: item.url,
                });
                return arr;
              })
              .then((res) => setAllPokemon(res));
          });

          setResult(response.data.results);
        });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(allPokemon);
  return (
    <>
      {loading ? (
        <View style={styles.container}>
          <Text>Loading</Text>
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={allPokemon}
            renderItem={(item) => <Card pokemon={item.item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2C3BA',
  },
});
