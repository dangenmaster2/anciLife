import { View, Text, Pressable, StyleSheet } from 'react-native';

const PrimaryButton = ({ 
  onPress = () => {}, 
  rippleColor = '#31ed23',  
  customStyles,
  buttonText,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.signUpButtonContainer}
        android_ripple={{ color: rippleColor }}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    // width: '70%'
  },
  signUpButtonContainer: {
    height: 60,
    width: '50%',
    borderWidth: 1.3,
    borderRadius: 45,
    backgroundColor: '#31b258',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 15
  },
  buttonText: {
    letterSpacing: 5,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 40,
    marginRight: 40
  }
});

export default PrimaryButton;
