import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarCodeScanner } from 'expo-barcode-scanner';
import SnackBar from 'react-native-snackbar-component';

export default function QRCodeScanner({ route }: any) {
  const { show } = route.params;
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [feedback, setFeedback] = useState('');

  const showFeedback = feedback.length > 0;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const closeSnackbar = () => {
    setFeedback('');
  };

  const handleBarCodeScanned = async ({ type, data }: any) => {
    setScanned(true);
    if (type === 256) {
      const saved = await isShowSaved();
      if (saved) {
        setFeedback(`The show ${show.title}, already exists in the database`);
        setTimeout(() => {
          closeSnackbar();
        }, 3000);
      } else {
        saveShow();
      }
    }
  };

  const saveShow = async () => {
    try {
      const stringShow = JSON.stringify(show);
      await AsyncStorage.setItem(show.title, stringShow);
      setFeedback(`The show ${show.title}, has saved successfully`);
      setTimeout(() => {
        closeSnackbar();
      }, 3000);
    } catch (e) {
      alert('Error has occured');
    }
  };

  const isShowSaved = async () => {
    try {
      const value = await AsyncStorage.getItem(show.title.toString());
      if (value !== null) {
        return true;
      }
      return false;
    } catch (e) {
      // error reading value
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
      <SnackBar
        visible={showFeedback}
        textMessage={feedback}
        actionHandler={() => {
          closeSnackbar();
        }}
        actionText='close'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
