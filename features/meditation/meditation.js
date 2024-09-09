import { StyleSheet, Text, View } from "react-native"


const Meditation = () => {
    return(
        <View style={styles.meditationContainer}>
            <Text>Meditation</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    meditationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Meditation;