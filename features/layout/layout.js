import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
// import Login from '../login/login';
import Auth from '../login/Auth';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
const Layout = ({ navigation }) => {
  const fontLoaded = useFonts({
    'open-sans': require('../../assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
  });
  if (!fontLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.appContainer}>
      <LinearGradient
        colors={['#6cd626', 'transparent']}
        style={styles.background}
      />
        <StatusBar style='light' />
        <Auth navigation={{navigation}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 20,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'open-sans-bold',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 200,
  },
  backgroundImage: {
    opacity: 0.15,
  }
});

export default Layout;
