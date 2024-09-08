import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import UserName from "./pages/userName";
import { useDispatch, useSelector } from "react-redux";
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { selectinfoDirectionIndex, selectUserInfoFocusSection, setAllUserInfo, setInfoDirectionIndex, setUserInterests, setUserName, USER_GENDER, USER_INTERESTS, USER_NAME } from "./userInfo.slice";
import { useCallback, useEffect, useState } from "react";
import UserGender from "./pages/userGender";
import UserInterests from "./pages/userInterests";
import { setUserInfoCollected } from "../layout/layout.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uid } from 'react-uid';

const HomePageLoading = () => {
    return(
        <Text style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>Home Page Loading</Text>
    )
}

const UserInfo = ({navigation}) => {
    const userInfoDirectionIndex = useSelector(selectinfoDirectionIndex);
    const state_userInfoFocusSection = useSelector(selectUserInfoFocusSection);
    const width = useSharedValue(100);
    const dispatch = useDispatch();


    const [userName, setUserNameLocal] = useState('');
    const [gender, setGender] = useState(''); 
    const [userTopicInterests, setUserTopicInterests] = useState([]);

    const saveUserData = async () => {
        //this id will be generated in combination with name and dob for guests only
        const userId = uid(userName);
        const userInfoData = JSON.stringify({userId, userName, gender, userTopicInterests})
        try {
            await AsyncStorage.setItem('@userInfoData', userInfoData);
            dispatch(setAllUserInfo(JSON.parse(userInfoData)))
            dispatch(setUserInfoCollected(true));
        }
        catch(err) {
            console.log(err)
        }
    }

    const userInfoFocusHandler = useCallback((param) => {
        width.value = withSpring(width.value + 50);
        if (param === 1 && state_userInfoFocusSection === USER_INTERESTS) {
            saveUserData();
            navigation.navigate('home');
            return;
        }
        const focusedSectionIndex = userInfoDirectionIndex+param;
        dispatch(setInfoDirectionIndex(focusedSectionIndex > 0 ? userInfoDirectionIndex+param : 1));
    }, [userInfoDirectionIndex, userTopicInterests, state_userInfoFocusSection, navigation])

    return(
        <View style={styles.userInfoContainer}>
            <View style={styles.userInfoComponentsWrapper}>
                {state_userInfoFocusSection === USER_NAME && 
                    <UserName userName = {userName} 
                    setUserNameLocal = {setUserNameLocal}
                />}
                {state_userInfoFocusSection === USER_GENDER && <UserGender setGender={setGender}/>}
                {state_userInfoFocusSection === USER_INTERESTS && 
                <UserInterests 
                    userTopicInterests = {userTopicInterests}
                    setUserTopicInterests = {setUserTopicInterests}
                />}
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