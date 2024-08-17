import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ThemedInput } from '../layout/layout';
import { useState } from 'react';
import { setUserEmail } from './login.slice';


const Logo = () => {
    return(
        <Image
            style={styles.appLogo}
            source={require('../../assets/logo/Ancilife-logo.png')}
      />
    )
}

const Login = () => {
    const inputField = ['Email Address', 'Password', 'Confirm Password'];
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);

    const emailInputHandler = (email) => {
      console.log(email)
      setEmail(email)
    }
    const passwordHandler = (password) => {
      console.log(password)
      setPassword(password)
    }
    const confirmPasswordHandler = (confirmPassword) => {
      console.log(confirmPassword)
      setConfirmPassword(confirmPassword)
    }

    const setUserData = () => {
      if (password !== confirmPassword) setPasswordMatch(false);
      else setPasswordMatch(true);
      setUserEmail(email);
      setPassword(password);
    }
    return (
      <View style={styles.loginContainer}>
        <Logo />
        <Text style={styles.signUp}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} onChangeText={emailInputHandler} placeholder='Enter your email'/>
          <TextInput style={styles.textInput} onChangeText={passwordHandler} placeholder='Password'/>
          <TextInput style={styles.textInput} onChangeText={confirmPasswordHandler} placeholder='Confirm Password'/>
        </View>
        {
          !passwordMatch ? 
          <View style={styles.passwordMismatchContainer}>
          <Text>Password doesn't match</Text>
        </View> : <></>
        }
        <Pressable style={styles.signUpButton}>
          <View onPress={setUserData} >
            <Text>Sign Up</Text>
          </View>
        </Pressable>
        <Pressable style={styles.signUpButton}>
          <View onPress={setUserData} >
            <Text>Log In</Text>
          </View>
        </Pressable>
      </View>
    );
  }

const styles = StyleSheet.create({
    loginContainer: {
        alignItems: 'center'
    },
    appLogo: {
        height: 200,
        width: 200
    },
    signUp: {
        fontSize: 40,
        fontWeight: '400',
        marginBottom: 20
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      width: 330,
      margin: 8,
      height: 48,
      backgroundColor: 'white',
      paddingLeft: 16,
      borderRadius: 7
  },
  inputContainer: {

  },
  passwordMismatchContainer: {
    padding: 20,
  },
  signUpButton: {
    backgroundColor: '#ce531a',
    height: 50,
    width: 330,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#f9f6f4',
    marginTop: 10
  }
  })

  export default Login;