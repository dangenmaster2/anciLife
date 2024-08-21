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
const Layout = ({ children }) => {
  // const fontLoaded = useFonts({
  //   'open-sans': require('../../assets/fonts/OpenSans-Regular.ttf'),
  //   'open-sans-bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
  // });
  // if (!fontLoaded) {
  //   return <AppLoading />;
  // }
  return (
    <SafeAreaView style={styles.appContainer}>
      {/* <Ionicons name='add-circle' size={24} color={white} /> */}
      <StatusBar style='dark' />
      <Auth />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 60,
    backgroundColor: '#e3e5d5',
    flex: 1,
    fontFamily: 'open-sans-bold',
  },
  backgroundImage: {
    opacity: 0.15,
  },
});

export default Layout;
