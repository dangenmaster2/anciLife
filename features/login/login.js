import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { ThemedInput } from '../layout/layout';


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
    return (
      <View style={styles.loginContainer}>
        <Logo />
        <Text style={styles.signUp}>Sign Up</Text>
        <ThemedInput inputs={inputField} />
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
    }
  })

  export default Login;