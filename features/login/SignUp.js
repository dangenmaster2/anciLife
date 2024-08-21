import { View, TextInput, Pressable, Text } from 'react-native';

import useSignUpwithEmailAndPassword from '../hooks/useSignUpwithEmailAndPassword';

const SignUp = () => {
  const { isLoading, signUp } = useSignUpwithEmailAndPassword();
  return (
    <View>
      <TextInput placeholder='Enter your email' />
      <TextInput placeholder='Enter your password' />
      <TextInput placeholder='Confirm Password' />
      <Pressable>
        <Text>Sign Up</Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
