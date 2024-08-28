import { StyleSheet, Text, View } from "react-native";
import { selectUserInfoFocusSection, USER_INTERESTS } from "../userInfo.slice";
import { useSelector } from "react-redux";

const UserInterests = () => {
    const userInfoFocusSection = USER_INTERESTS;
    const state_userInfoFocusSection = useSelector(selectUserInfoFocusSection);
    if (userInfoFocusSection !== state_userInfoFocusSection) return;
    return(
        <View style={styles.userInfoContainer}>
            <Text>
                user interest container
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

export default UserInterests;