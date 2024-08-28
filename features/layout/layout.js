import {
  StyleSheet,
  View,
} from 'react-native';
import Auth from '../login/Auth';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useEffect, useState } from 'react';
import OnBoarding from '../onboarding/onboarding';
import { useDispatch, useSelector } from 'react-redux';
import { selectOnboardingCompleted, setOnboardingCompleted } from '../onboarding/onBoarding.slice';
import UserInfo from '../userInfo/userInfo';

const Layout = ({ navigation }) => {
  const onboardingStatus = useSelector(selectOnboardingCompleted);
  const dispatch = useDispatch();

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');

      if (value !== null) {
        dispatch(setOnboardingCompleted(true));
      }
    }
    catch(error) {
      console.log(error)
    }
  }

  useEffect(() => { checkOnboarding() }, [])

  // const fontLoaded = useFonts({
  //   'open-sans': require('../../assets/fonts/OpenSans-Regular.ttf'),
  //   'open-sans-bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
  // });
  // if (!fontLoaded) {
  //   return <AppLoading />;
  // }
  return (
    <View style={styles.appContainer}>
      <LinearGradient
        colors={['#6cd626', 'black']}
        style={styles.background}
      />

        <StatusBar style='dark' />
        {onboardingStatus ? <UserInfo /> : <OnBoarding />}
        {/* <Auth navigation={{navigation}} */}
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'open-sans-bold',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  backgroundImage: {
    opacity: 0.15,
  }
});

export default Layout;
