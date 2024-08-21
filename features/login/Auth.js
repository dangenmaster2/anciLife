import { Button, StyleSheet, Text, View } from 'react-native';

import { useState } from 'react';

import Logo from '../../components/Logo';
import SignUp from './SignUp';
import UserLogin from './UserLogin';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);

  const toggleIsLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <View>
      <Logo />
      {!isLogin ? <UserLogin /> : <SignUp />}
      <View>
        <Text>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
        </Text>
      </View>
      <View>
        <Button onPress={toggleIsLogin} title={isLogin ? 'Sign up' : 'Login'} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({});

export default Auth;
