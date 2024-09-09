import { StyleSheet, Text, View } from "react-native"


const Profile = () => {
    return(
        <View style={styles.profileContainer}>
            <Text>Profile</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Profile;