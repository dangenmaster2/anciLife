import {StyleSheet, Text, View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {selectUserInfoFocusSection, USER_NAME} from '../userInfo.slice';
import InputField from '../../../components/InputField';
import UserAvatar from '../../../svgs/userAvatar';
import {Svg} from 'react-native-svg';
// import UserNameAvatar from '../../../assets/svgs/profile_avatar.svg';

const UserName = ({userName, setUserNameLocal}) => {
  const userInfoFocusSection = USER_NAME;
  const state_userInfoFocusSection = useSelector(selectUserInfoFocusSection);

  if (userInfoFocusSection !== state_userInfoFocusSection) return;

  return (
    <View>
      <View style={styles.userInfoContainer}>
        <Text style={{fontSize: 30, fontWeight: 'bold', paddingBottom: 50}}>
          What should we call you?
        </Text>
        <InputField
          placeHolderText="A nickname will be perfect"
          onChangeText={text => setUserNameLocal(text)}
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
  image: {
    flex: 0.7,
    justifyContent: 'center',
    width: 40,
  },
  svgContainer: {
    // flex: 1,
    alignItems: 'center',
    height: '30%',
    // width: 500,
    justifyContent: 'center',
  },
});

export default UserName;
