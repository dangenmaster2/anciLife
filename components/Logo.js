import { Image, StyleSheet, View } from 'react-native';

const Logo = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
      style={styles.imageContainer}
      source={require('../assets/logo/Ancilife-logo.png')}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    height: 200,
    width: 200
  }
})

export default Logo;
