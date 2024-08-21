import { View, TextInput, Pressable, Text } from 'react-native';

const UserLogin = () => {
  return (
    <View>
      <TextInput placeholder='Enter your email' />
      <TextInput placeholder='Enter your password' />
      <Pressable>
        <Text>Log in</Text>
      </Pressable>
    </View>
  );
};

export default UserLogin;
