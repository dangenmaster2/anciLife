import {
  StyleSheet,
  View,
} from 'react-native';
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
import { selectUserInfoCollected, setUserInfoCollected } from './layout.slice';
import Home from '../home/home';
import { setAllUserInfo } from '../userInfo/userInfo.slice';

const Layout = ({ navigation }) => {
  const onboardingStatus = useSelector(selectOnboardingCompleted);
  const userInfoCollected = useSelector(selectUserInfoCollected);
  const dispatch = useDispatch();

  const [loaded, error] = useFonts({
    'Inter-Black': require('../../assets/fonts/Rubik/Rubik-Italic-VariableFont_wght.ttf')
  });

  if (!loaded && !error) {
    return null;
  }

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

  const checkUserInfoCollected = async () => {
    try {
      const userInfo = await AsyncStorage.getItem('@userInfoData');
      if ( userInfo !== null) {
        dispatch(setAllUserInfo(JSON.parse(userInfo)))
        dispatch(setUserInfoCollected(true));
      }
    }

    catch(err) {
      console.log(err)
    }
  }

  useEffect(() => { 
    checkOnboarding();
    checkUserInfoCollected();
  }, [])
  
  return (
    <View style={styles.appContainer}>
      {/* <LinearGradient
        colors={['#6cd626', 'black']}
        style={styles.background}
      /> */}

        <StatusBar style='dark' />
        {/* {userInfoCollected ? <Home navigation={navigation}/> : onboardingStatus ? <UserInfo navigation={navigation}/> : <OnBoarding />} */}
        {/* <Auth navigation={{navigation}} */}
        <Home navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'protest-guerilla',
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
