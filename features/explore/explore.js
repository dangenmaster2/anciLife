import { StyleSheet, Text, View } from "react-native"


const Explore = () => {
    return(
        <View style={styles.exploreContainer}>
            <Text>explore</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    exploreContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Explore;