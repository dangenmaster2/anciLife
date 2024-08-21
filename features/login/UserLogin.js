import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

const UserLogin = () => {
  return (
    <View style={styles.signUpContainer}>
      <TextInput style={styles.inputContainer} placeholder='Enter your email' />
      <TextInput style={styles.inputContainer} placeholder='Enter your password' />
      <Pressable style={styles.signUpButton}>
        <Text>Log in</Text>
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

export default UserLogin;
