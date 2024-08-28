import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import UserName from "./pages/userName";
import { useDispatch, useSelector } from "react-redux";
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { selectinfoDirectionIndex, selectUserInfoFocusSection, setInfoDirectionIndex, setUserName, USER_NAME } from "./userInfo.slice";
import { useCallback, useState } from "react";
import UserGender from "./pages/userGender";
import UserInterests from "./pages/userInterests";

const UserInfo = () => {
    const userInfoDirectionIndex = useSelector(selectinfoDirectionIndex);
    const state_userInfoFocusSection = useSelector(selectUserInfoFocusSection);
    const width = useSharedValue(100);
    const dispatch = useDispatch();
    const [userName, setUserNameLocal] = useState('');
    const userInfoFocusHandler = useCallback((param) => {
        width.value = withSpring(width.value + 50);
        const focusedSectionIndex = userInfoDirectionIndex+param;
        state_userInfoFocusSection === USER_NAME && dispatch(setUserName(userName));
        dispatch(setInfoDirectionIndex(focusedSectionIndex > 0 ? userInfoDirectionIndex+param : 1));
    }, [userInfoDirectionIndex])

    return(
        <View style={styles.userInfoContainer}>
            <View style={styles.userInfoComponentsWrapper}>
                <UserName userName = {userName} setUserNameLocal = {setUserNameLocal}/>
                <UserGender />
                <UserInterests />
            </View>
            <View style={styles.previousNextButtonContainer}>
                <PrimaryButton onPress={() => userInfoFocusHandler(-1)} buttonText = 'BACK'/>
                <PrimaryButton onPress={() => userInfoFocusHandler(1)} buttonText = 'NEXT'/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    userInfoContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    userInfoComponentsWrapper: {
        flex: 3
    },
    previousNextButtonContainer: {
        flex: .5,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
})

export default UserInfo;