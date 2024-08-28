import { StyleSheet, Text, View } from "react-native";
import { selectUserInfoFocusSection, USER_GENDER } from "../userInfo.slice";
import { useSelector } from "react-redux";

const UserGender = () => {
    const userInfoFocusSection = USER_GENDER;
    const state_userInfoFocusSection = useSelector(selectUserInfoFocusSection);
    if (userInfoFocusSection !== state_userInfoFocusSection) return;
    return(
        <View style={styles.userInfoContainer}>
            <Text>
                user gender container
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    userInfoContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default UserGender;