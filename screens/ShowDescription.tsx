import React from 'react';
import { Image, StyleSheet, ScrollView } from 'react-native';
import { View, Text } from '../components/Themed';
import { show } from '../types';

const ShowDescription = ({ route }: any) => {
  const { show, imageData } = route.params;

  return (
    <View style={styles.wrapper}>
      <Image
        source={{
          uri: imageData,
        }}
        style={{ width: 140, height: 196 }}
      />
      <Text style={styles.title}>{show.title}</Text>
      <ScrollView style={styles.details}>
        <Text style={styles.detailText}>Premiered: {show.releaseYear}</Text>
        <Text style={styles.detailText}>Rating: {show.rating}</Text>
        <Text style={styles.detailText}>Genres: {show.genre.join(', ')}</Text>
      </ScrollView>
    </View>
  );
};

export default ShowDescription;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#21262d',
    height: '100%',
    padding: 20,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c9d1d9',
  },
  details: {
    backgroundColor: '#21262d',
    width: '100%',
    padding: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#c9d1d9',
    marginTop: 15,
  },
  summary: {
    paddingVertical: 20,
  },
});
