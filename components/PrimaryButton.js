import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';

const PrimaryButton = ({ 
  onPress = () => {}, 
  rippleColor = 'transparent',  
  customStyles,
  buttonText,
}) => {
  const width = useSharedValue(170);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  const handlePress = () => {
    width.value = withSpring(width.value+20);
    setTimeout(() => {
      width.value = 170;
    }, 500);
    onPress();
  };

  return (
    <View style={styles.buttonContainer}>
      <Animated.View style={[animatedStyle]}>
        <Pressable
          style={[styles.signUpButtonContainer]}
          android_ripple={{ color: rippleColor }}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    // width: '70%'
  },
  signUpButtonContainer: {
    height: 60,
    // width: '50%',
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
