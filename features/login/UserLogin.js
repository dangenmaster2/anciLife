import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

import useUserLogin from '../hooks/useUserLogin';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserAuthenticated, setLoggedIn, setUserAuthenticated } from './login.slice';
import useLogout from '../hooks/useLogout';
import PrimaryButton from '../../components/PrimaryButton';
import InputField from '../../components/InputField';

const UserLogin = ({navigation}) => {
  const { isLoading, userLoginFunc } = useUserLogin();
  const { userLogoutFnc } = useLogout();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const authenticationState = useSelector(selectUserAuthenticated);
  const handleLoggedInState = () => {
    dispatch(setLoggedIn(false))
  }
  useEffect(() => {
    if (authenticationState) {
      navigation.navigation.navigate("home");
    }
  }, [authenticationState])
  return (
    <View style={styles.signUpContainer}>
      <View style={styles.logInTextContainer}>
        <Text style={styles.logInText}>Login To Your Account</Text>
      </View>
      <InputField onChangeText={(text) => {setEmail(text)}} placeHolderText='Enter your Email' />
      <InputField onChangeText={(text) => {setPassword(text)}} placeHolderText='Enter password' secureTextEntry={true}/>
      <PrimaryButton onPress={() => {userLoginFunc(email, password)}} buttonText="LOGIN"/>
      <View style={styles.alreadyHaveAccountContainer}>
        <Text>Don't have an account?</Text>
        <Pressable>
          <Text style={styles.loginHere} onPress={handleLoggedInState}> Sign Up here</Text>
        </Pressable>
        </View>
    </View>
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
  inputContainer: {
    height: 60,
    width: '100%',
    borderWidth: 1.2,
    borderRadius: 5,
    borderColor: '#3eb783',
    backgroundColor: 'white',
    marginBottom: 15,
    paddingLeft: 18
  },
  alreadyHaveAccountContainer: {
    flexDirection: 'row',
    marginTop: 20
  },
  loginHere: {
    color: '##31b258'
  }
});

export default UserLogin;
