import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {Card} from '../Card/Card';
import {Pokemon} from '../../api/models/pokemon.model';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SearchBar} from '../SearchBar/SearchBar';

type Props = {
  navigation: any;
};
export const PokemonList: React.FC<Props> = ({navigation}) => {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  let arr: Pokemon[] = [];

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
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  const onSearch = (text: string) => {
    const inputText = text.toLowerCase();
    console.log(text);
    if (text.length >= 3) {
      setLoading(true);
      try {
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${inputText}`)
          .then((response) => {
            arr = [];
            arr.push({
              name: response.data.name,
              imageUri: response.data.sprites.front_default,
              url: `https://pokeapi.co/api/v2/pokemon/${inputText}`,
            });
            setAllPokemon(arr);
          });
      } catch (error) {
        console.error(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading ? (
        <View style={styles.container}>
          <Text>Loading</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <SearchBar onSearchValue={(text: string) => onSearch(text)} />
          <FlatList
            data={allPokemon}
            renderItem={(item) => <Card pokemon={item.item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
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
