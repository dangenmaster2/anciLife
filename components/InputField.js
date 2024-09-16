import {View, StyleSheet, TextInput} from 'react-native';

const InputField = ({
  extraStyles,
  onChangeText,
  placeHolderText,
  secureTextEntry,
}) => {
  return (
    <View style={styles.inputWrapperContainer}>
      <TextInput
        style={styles.inputContainer}
        onChangeText={onChangeText}
        placeholder={placeHolderText}
        placeholderTextColor="#020001"
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapperContainer: {
    width: '80%',
  },
  inputContainer: {
    height: 40,
    width: '100%',
    borderBottomWidth: 2,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 5,
  },
});

export default InputField;
