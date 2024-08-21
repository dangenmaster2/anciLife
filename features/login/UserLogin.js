import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

import useUserLogin from '../hooks/useUserLogin';

import { useState } from 'react';

const UserLogin = () => {
  const { isLoading, userLoginFunc } = useUserLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View>
      <TextInput
        onChangeText={(text) => {
          setEmail(text);
        }}
        placeholder='Enter your email'
      />
      <TextInput
        onChangeText={(text) => {
          setPassword(text);
        }}
        placeholder='Enter your password'
      />
      <Pressable
        onPress={() => {
          userLoginFunc(email, password);
        }}
      >
        <Text>Log in</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  signUpContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    height: 60,
    width: '80%',
    backgroundColor: 'yellow',
    marginBottom: 5,
  },
  signUpButton: {
    height: 60,
    width: '40%',
    backgroundColor: 'red',
  },
});

export default UserLogin;
