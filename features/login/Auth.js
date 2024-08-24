import { Button, StyleSheet, Text, View } from 'react-native';

import { useState } from 'react';

import Logo from '../../components/Logo';
import SignUp from './SignUp';
import UserLogin from './UserLogin';
import { selectLoggedInState, selectUserEmail } from './login.slice';
import { useSelector } from 'react-redux';

const Auth = ({navigation}) => {
  const loggedInState = useSelector(selectLoggedInState) || false;
  return (
    <View style={style.authContainer}>
      <Logo />
      {loggedInState ? <UserLogin navigation={navigation}/> : <SignUp navigation={navigation}/>} 
    </View>
  );
};

const style = StyleSheet.create({
  authContainer: {
    width: '100%'
  },
});

export default Auth;
