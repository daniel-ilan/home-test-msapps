import React, { FC, useState, useEffect } from 'react';
import { View, Pressable, Text, Image, StyleSheet } from 'react-native';
import { show } from '../types';
import axios from 'axios';

interface Iprops {
  show: show;
  navigation: any;
}

const ShowItem: FC<Iprops> = ({ show, navigation }) => {
  const [imageData, setImageData] = useState<string | null>(null);

  const onPressLearnMore = () => {
    navigation.navigate('QRCodeScanner', { show });
  };

  const onPressShow = () => {
    navigation.navigate('ShowDescription', { show, imageData });
  };

  useEffect(() => {
    const getImageDataUri = async () => {
      const lastSegment = show.image.split('/').pop();
      const imageName = lastSegment!.split('.').slice(0, -1).join('.');
      const image = await axios.get(
        `https://movies-server-pipe.herokuapp.com/image/${imageName}`,
      );
      setImageData(image.data);
    };
    getImageDataUri();
  }, []);

  return (
    <Pressable style={styles.showItem} onPress={() => onPressShow()}>
      <View style={styles.header}>
        <Text style={styles.title}>{show.title}</Text>
        <Text style={styles.premiered}>{show.releaseYear}</Text>
        <Image
          source={{
            uri: imageData
              ? imageData
              : '../assets/images/image-placeholder-icon-9.jpg',
          }}
          style={{ width: 140, height: 196 }}
        />
      </View>

      <Pressable
        onPress={() => onPressLearnMore()}
        style={styles.button}
        accessibilityLabel='Learn more about this purple button'>
        <Text style={styles.buttonText}>Add Show</Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  showItem: {
    padding: 10,
    marginVertical: 7,
    display: 'flex',
    backgroundColor: '#21262d',
    borderColor: '#484f58',
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'solid',
  },
  premiered: {
    color: '#c9d1d9',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c9d1d9',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  button: {
    borderRadius: 5,
    backgroundColor: 'purple',
    alignSelf: 'center',
    padding: 7,
    minWidth: 200,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ShowItem;
