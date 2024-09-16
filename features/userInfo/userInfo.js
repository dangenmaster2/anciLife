import {StyleSheet, Text, View} from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import UserName from './pages/userName';
import {useDispatch, useSelector} from 'react-redux';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import {
  selectinfoDirectionIndex,
  selectUserInfoFocusSection,
  setAllUserInfo,
  setInfoDirectionIndex,
  setUserInterests,
  setUserName,
  USER_GENDER,
  USER_INTERESTS,
  USER_NAME,
  USER_COUNTRY,
} from './userInfo.slice';
import {useCallback, useEffect, useState} from 'react';
import UserGender from './pages/userGender';
import UserInterests from './pages/userInterests';
import UserCountry from './pages/userCountry';

import {setUserInfoCollected} from '../layout/layout.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {uid} from 'react-uid';

import * as Progress from 'react-native-progress';

const HomePageLoading = () => {
  return (
    <Text style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      Home Page Loading
    </Text>
  );
};

const UserInfo = ({navigation}) => {
  const [progressBar, setProgress] = useState(0.1);

  const userInfoDirectionIndex = useSelector(selectinfoDirectionIndex);
  const state_userInfoFocusSection = useSelector(selectUserInfoFocusSection);
  const width = useSharedValue(100);
  const dispatch = useDispatch();

  const [userName, setUserNameLocal] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [gender, setGender] = useState('');
  const [userTopicInterests, setUserTopicInterests] = useState([]);

  const handleNextProgressBar = () => {
    setProgress(prevProgress => prevProgress + 0.3);
  };

  const handleBackProgressBar = () => {
    if (progressBar > 0.1) setProgress(prevProgress => prevProgress - 0.3);
  };

  const saveUserData = async () => {
    //this id will be generated in combination with name and dob for guests only
    const userId = uid(userName);
    const userInfoData = JSON.stringify({
      userId,
      userName,
      gender,
      userTopicInterests,
    });
    try {
      await AsyncStorage.setItem('@userInfoData', userInfoData);
      dispatch(setAllUserInfo(JSON.parse(userInfoData)));
      dispatch(setUserInfoCollected(true));
    } catch (err) {
      console.log(err);
    }
  };

  const userInfoFocusHandler = useCallback(
    param => {
      width.value = withSpring(width.value + 50);
      if (param === 1 && state_userInfoFocusSection === USER_INTERESTS) {
        saveUserData();
        navigation.navigate('MainHome');
        return;
      }
      const focusedSectionIndex = userInfoDirectionIndex + param;
      dispatch(
        setInfoDirectionIndex(
          focusedSectionIndex > 0 ? userInfoDirectionIndex + param : 1,
        ),
      );
    },
    [
      userInfoDirectionIndex,
      userTopicInterests,
      state_userInfoFocusSection,
      navigation,
    ],
  );

  const backButtonStyle = {
    height: 40,
    borderWidth: 1.3,
    borderRadius: 45,
    backgroundColor: 'g',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 15,
  };

  return (
    <View style={styles.userInfoContainer}>
      <View style={{paddingTop: 70}}>
        <Progress.Bar progress={progressBar} width={150} color="#6B8E23" />
      </View>
      <View style={styles.userInfoComponentsWrapper}>
        {state_userInfoFocusSection === USER_NAME && (
          <UserName userName={userName} setUserNameLocal={setUserNameLocal} />
        )}
        {state_userInfoFocusSection === USER_GENDER && (
          <UserGender setGender={setGender} />
        )}
        {state_userInfoFocusSection === USER_INTERESTS && (
          <UserInterests
            userTopicInterests={userTopicInterests}
            setUserTopicInterests={setUserTopicInterests}
          />
        )}
        {state_userInfoFocusSection === USER_COUNTRY && (
          <UserCountry setUserCountry={setUserCountry} />
        )}
      </View>
      <View style={styles.previousNextButtonContainer}>
        <PrimaryButton
          onPress={() => {
            userInfoFocusHandler(-1);
            handleBackProgressBar();
          }}
          buttonText="BACK"
          customStyles={backButtonStyle}
        />
        <PrimaryButton
          onPress={() => {
            userInfoFocusHandler(1);
            handleNextProgressBar();
          }}
          buttonText="NEXT"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoComponentsWrapper: {
    flex: 3,
  },
  previousNextButtonContainer: {
    flex: 0.5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default UserInfo;
