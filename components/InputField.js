import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';

const InputField = ({
    extraStyles,
    onChangeText,
    placeHolderText,
    secureTextEntry
}) => {
    return(
        <View style={styles.inputWrapperContainer}>
            <TextInput 
                style={styles.inputContainer} 
                onChangeText={onChangeText} 
                placeholder={placeHolderText}
                placeholderTextColor="#bae0c5"
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputWrapperContainer: {
        width: '80%'
    },
    inputContainer: {
        height: 60,
        width: '100%',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#3eb783',
        backgroundColor: 'white',
        marginBottom: 15,
        paddingLeft: 18
      },
})

export default InputField;