import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

import useSignUpwithEmailAndPassword from '../hooks/useSignUpwithEmailAndPassword';
import { useState } from 'react';
import { setGlobalPassword, setUserEmail } from './login.slice';
import { useDispatch } from 'react-redux';

const SignUp = () => {
  const { isLoading, signUp } = useSignUpwithEmailAndPassword();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleEmail = (text) => {
    console.log('email ', text)
    setEmail(text);
    dispatch(setUserEmail(text))
  }
  const handlePassword = (text) => {
    console.log('password ', text)
    setPassword(text);
    dispatch(setGlobalPassword(text))
  }

  return (
    <View style={styles.signUpContainer}>
      <TextInput style={styles.inputContainer} onChangeText={handleEmail} 
      placeholder='Enter your email' />
      <TextInput style={styles.inputContainer} 
      onChangeText={handlePassword}
      placeholder='Enter your password' />
      <TextInput style={styles.inputContainer} placeholder='Confirm Password' />
      <Pressable style={styles.signUpButton} onPress={() => {
        signUp(email, password);
      }}>
        <Text>Sign Up</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  signUpContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    height: 60,
    width: '80%',
    backgroundColor: 'yellow',
    marginBottom: 5
  },
  signUpButton: {
    height: 60,
    width: '40%',
    backgroundColor: 'red',
  }
})

export default SignUp;
