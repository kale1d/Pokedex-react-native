import React from 'react';
import {Text, View, Button, Image, StyleSheet, StatusBar} from 'react-native';
import {Pokemon} from '../../api/models/pokemon.model';
import {useNavigation} from '@react-navigation/native';
import {Dimensions} from 'react-native';

type Props = {
  pokemon: Pokemon;
};
const width = Dimensions.get('window').width;
export const Card: React.FC<Props> = ({pokemon}) => {
  // console.log(pokemon);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.font, {color: '#DD614A'}]}>Name </Text>
        <Text style={styles.font}>{pokemon.name}</Text>
      </View>
      <Image source={{uri: pokemon.imageUri}} style={styles.image} />
      <Text
        style={[styles.font, {color: '#487052'}]}
        onPress={() =>
          navigation.navigate('PokemonDetails', {url: pokemon.url})
        }>
        More Details
      </Text>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Recursive-semi-bold',
    fontSize: 12,
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  font: {
    textTransform: 'capitalize',
    fontFamily: 'Recursive',
    fontWeight: '700',
  },
  image: {
    width: 100,
    height: 100,
    justifyContent: 'center',
  },
  separator: {
    width: 300,
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
