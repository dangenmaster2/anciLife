import { View, Text, Pressable } from 'react-native';

function PrimaryButton({ children }) {
    const pressHandler = () => {
        console.log('pressed')
    }
    return(
        <Pressable 
            // style={({pressed}) => pressed ? 'some style' : 'other style'}
            onPress={pressHandler} 
            android_ripple={{color: 'red'}}>
            <View>
                <Text>
                    {children}
                </Text>
            </View>
        </Pressable>
    )
}