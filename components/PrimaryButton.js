import {View, Text, Pressable, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withRepeat,
} from 'react-native-reanimated';

const PrimaryButton = ({
  onPress,
  rippleColor = 'transparent',
  customStyles,
  buttonText,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      opacity: opacity.value,
    };
  });

  const handlePress = () => {
    scale.value = withRepeat(withSpring(0.9), 2, true);
    opacity.value = withRepeat(withSpring(0.8), 2, true);
    onPress();
  };

  return (
    <View style={styles.buttonContainer}>
      <Animated.View style={[animatedStyle]}>
        <Pressable
          style={[styles.signUpButtonContainer]}
          android_ripple={{color: rippleColor}}
          onPress={handlePress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {},
  signUpButtonContainer: {
    height: 40,
    borderRadius: 45,
    backgroundColor: '#6B8E23',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 15,
    width: 110,
  },
  buttonText: {
    letterSpacing: 4,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PrimaryButton;
