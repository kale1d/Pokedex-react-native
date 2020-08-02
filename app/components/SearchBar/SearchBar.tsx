import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const width = Dimensions.get('window').width - 60;
type Props = {
  onSearchValue: (search: string) => void;
};
export const SearchBar: React.FC<Props> = ({onSearchValue}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        onChangeText={onSearchValue}
        clearTextOnFocus
        placeholder="Type your search here"
        placeholderTextColor="#CECECE"
        enablesReturnKeyAutomatically
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: width,
    margin: 20,
  },
  searchBar: {
    fontSize: 11,
    margin: 10,
    width: '80%',
    height: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#792115',
    borderRadius: 10,
  },
});
