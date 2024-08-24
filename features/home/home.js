import { Pressable, StyleSheet, Text, View } from "react-native"
import useLogout from "../hooks/useLogout";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";

const Home = ({navigation}) => {
    console.log('navigation is', navigation);
    const { userLogoutFnc } = useLogout();
    return(
        <View style={styles.homeScreenContainer}>
            <PrimaryButton
                onPress={() => {
                    navigation.navigate('layout')
                    userLogoutFnc();
                }}
                buttonText='LOG OUT'
            >
            </PrimaryButton>
        </View>
    )
}
const styles = StyleSheet.create({
    homeScreenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Home;