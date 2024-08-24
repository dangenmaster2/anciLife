import { View, TextInput, Pressable, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';

import useSignUpwithEmailAndPassword from '../hooks/useSignUpwithEmailAndPassword';
import useLogout from '../hooks/useLogout';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from './login.slice';
import PrimaryButton from '../../components/PrimaryButton';
import InputField from '../../components/InputField';

const SignUp = () => {
  const { isLoading, signUp } = useSignUpwithEmailAndPassword();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (text) => {
    setEmail(text);
  };
  const handlePassword = (text) => {
    setPassword(text);
  };

  const handleLoggedInState = () => {
    dispatch(setLoggedIn(true))
  }

  return (
    <KeyboardAvoidingView>
      <View style={styles.signUpContainer}>
      <View style={styles.logInTextContainer}>
        <Text style={styles.logInText}>Create New Account</Text>
      </View>
      <InputField onChangeText={handleEmail} placeHolderText='Enter your email' />
      <InputField onChangeText={handlePassword} placeHolderText='Enter your password' secureTextEntry={true}/>
      <InputField placeHolderText='Confirm Password' />
      <PrimaryButton 
        onPress={() => { signUp(email, password)} }
        buttonText = 'SIGN UP'
      />
      <View style={styles.alreadyHaveAccountContainer}>
        <Text>Already have an account?</Text>
        <Pressable style={{
          backgroundColor: 'green', 
          borderRadius: 15, 
          paddingLeft: 10, 
          paddingRight: 10,
          alignItems: 'center',
          justifyContent: 'center'
          }}>
          <Text style={styles.loginHere} onPress={handleLoggedInState}> Login here</Text>
        </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  logInTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#99d8dd',
    height: 50,
    width: 425,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginBottom: 20
  },
  logInText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  signUpContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100
  },
  alreadyHaveAccountContainer: {
    flexDirection: 'row',
    marginTop: 20
  },
  loginHere: {
  }
});

export default SignUp;
