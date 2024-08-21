import { Image } from 'react-native';

const Logo = () => {
  return (
    <Image
      style={{
        width: 280,
        height: 280,
      }}
      source={require('../assets/logo/Ancilife-logo.png')}
    />
  );
};
export default Logo;
