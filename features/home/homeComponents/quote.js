import { StyleSheet, Text, View } from "react-native"

const Quote = () => {
    return(
        <View style={styles.quoteContainer}>
            <Text style={{
                fontSize: 23, 
                fontWeight: 'bold',
                color: '#fff',
                paddingVertical: 10
                }}>If there is no mind, there is no world.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    quoteContainer: {
        marginTop: 20,
        height: 'auto',
        backgroundColor: '#20a357',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Quote;