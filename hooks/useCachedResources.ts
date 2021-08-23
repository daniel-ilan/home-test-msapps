import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import * as FileSystem from 'expo-file-system';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  const downloadAssets = async () => {
    try {
      let name = 'Samplefile.json';
      const result = FileSystem.createDownloadResumable(
        'https://movies-server-pipe.herokuapp.com/all-movies',
        FileSystem.documentDirectory + name,
      );

      const response = await result.downloadAsync();
      if (response!.status === 200) {
        console.log(response, 'file saved!');
      } else {
        console.log('error');
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const jsonExists = async () => {
    const json = await FileSystem.getInfoAsync(
      FileSystem.documentDirectory + 'Samplefile.json',
    );
    return json.exists;
  };

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });

        const exists = await jsonExists();
        if (!exists) {
          await downloadAssets();
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
