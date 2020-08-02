import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Text, View, Button, Image, StyleSheet, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;

type Props = {
  navigation: any;
  route: any;
};

export const PokeDetail: React.FC<Props> = ({navigation, route}) => {
  const {url} = route.params;
  const [pokemon, setPokemon] = useState<any>({});
  const [loading, setLoading] = useState(false);

  console.log(url);
  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = async () => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        const pokemon = {
          name: res.data.name,
          imageUri: res.data.sprites.front_shiny,
          types: res.data.types,
          abilities: res.data.abilities,
        };
        setPokemon(pokemon);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  console.log(pokemon);
  return (
    <>
      {loading ? (
        <View style={styles.container}>
          <Text>Loading</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.titleHeader}>{pokemon.name}</Text>
          <Image source={{uri: pokemon.imageUri}} style={styles.image} />
          {pokemon.types &&
            pokemon.types.map((type, i) => {
              return (
                <View key={i} style={styles.infoWrapper}>
                  <Text style={[styles.font, styles.infoTitle]}>Type: </Text>
                  <Text style={styles.font}>{type.type.name}</Text>
                </View>
              );
            })}
          {pokemon.abilities &&
            pokemon.abilities.map((ability, j) => {
              return (
                <View key={j} style={styles.infoWrapper}>
                  <Text style={[styles.font, styles.infoTitle]}>Ability: </Text>
                  <Text style={styles.font}>{ability.ability.name}</Text>
                </View>
              );
            })}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2C3BA',
    alignItems: 'center',
  },
  titleHeader: {
    fontFamily: 'Recursive',
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'capitalize',
    marginTop: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#F6D1CB',
    backgroundColor: '#F3C1BA',
    margin: 20,
  },
  infoWrapper: {
    flexDirection: 'row',
  },
  font: {
    textTransform: 'capitalize',
    fontFamily: 'Recursive',
    fontWeight: '500',
  },
  infoTitle: {
    fontWeight: '700',
    color: '#DD5340',
  },
});
