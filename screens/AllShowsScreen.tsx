import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import * as FileSystem from 'expo-file-system';
import ShowItem from '../components/ShowItem';
import { View } from '../components/Themed';
import { show } from '../types';

export default function AllShowsScreen({ navigation }: any) {
  const [allShows, setAllShows] = useState<null | show[]>(null);

  useEffect(() => {
    const getFiles = async () => {
      try {
        const AllShowsString = await FileSystem.readAsStringAsync(
          FileSystem.documentDirectory + 'Samplefile.json',
        );
        const parsedShows: show[] = JSON.parse(AllShowsString);
        parsedShows.sort((a, b) => {
          const aDate = new Date(a.releaseYear);
          const bDate = new Date(b.releaseYear);
          return +bDate - +aDate;
        });

        setAllShows(parsedShows);
      } catch (error) {
        console.log(error);
      }
    };
    getFiles();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={allShows}
        renderItem={({ item }) => (
          <ShowItem show={item} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: '#0d1117',
    padding: 10,
  },
});
