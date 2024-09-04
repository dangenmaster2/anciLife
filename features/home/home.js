import { Pressable, StyleSheet, Text, View } from "react-native"
import useLogout from "../hooks/useLogout";
import PrimaryButton from "../../components/PrimaryButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db,  collection, getDocs } from "../../firebase/firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserInfoCollected } from "../layout/layout.slice";

const Home = ({navigation}) => {
    const { userLogoutFnc } = useLogout();
    const dispatch = useDispatch();
    const clearOnboarding = async () => {
        try {
            await AsyncStorage.removeItem('@viewedOnboarding')
        }
        catch(err) {
            console.log(err)
        }
    }
    const clearUserInfoData = async () => {
        try {
            console.log('clearing user info')
            await AsyncStorage.removeItem('@userInfoData')
            console.log('clearing user info successsful')
            dispatch(setUserInfoCollected(false));
        }
        catch(err) {
            console.log(err)
        }
    }
    useEffect(() => {
        const colRef = collection(db, 'articles');
        getDocs(colRef).then((snapshot) => {
            let articles = [];
            snapshot.docs.forEach((doc) => {
                // console.log('---data ', doc.data())
                // articles.push({...doc.data(), id:doc.id})
            })
        })
        return () => {
            console.log('home screen unmounting')
        }
    }, [])
    return(
        <View style={styles.homeScreenContainer}>
            <PrimaryButton
                onPress={() => {
                    clearUserInfoData();
                    navigation.navigate('layout');
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